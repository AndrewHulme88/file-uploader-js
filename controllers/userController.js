const passport = require("passport");
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  signUpForm: (req, res) => {
    res.render("sign-up-form");
  },

  signUp: [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
    body("password").isLength({ min:6 }).withMessage("Password must be at least 6 characters").matches(/\d/).withMessage("Password must contain a number"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.render("sign-up-form", {
          user: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
          },
          errors: errors.array()
        });
      }

      const { firstName, lastName, email, password } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
          "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
          [firstName, lastName, email, hashedPassword]
        );
        res.redirect("/users/login");
      } catch (err) {
        console.error("Error adding user", err);
        res.status(500).json({ error: "Failed to add user" });
      }
    },
  ]
};
