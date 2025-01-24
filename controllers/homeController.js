const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  showHomePage: (req, res) => {
    res.render("index");
  }
};
