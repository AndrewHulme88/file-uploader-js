const passport = require("passport");
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

module.exports = {
  signUpForm: (req, res) => {
    res.render("sign-up-form");
  }
};
