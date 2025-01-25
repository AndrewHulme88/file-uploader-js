const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.signUpForm);
userRouter.post("/sign-up", userController.signUp);

module.exports = userRouter;
