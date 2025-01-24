require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3000;

const app = express();
const prisma = new PrismaClient();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));



app.listen(PORT, () => console.log("App listening on port 3000"));
