const passport = require("passport");
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  signUpForm: (req, res) => {
    res.render("sign-up-form");
  }
};
