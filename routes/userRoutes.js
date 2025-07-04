const express = require("express");

const { signUpUser, signInUser, getMyInformation } = require("../services/userService");

const userRouter = express.Router();

userRouter.post("/sign-up", signUpUser);
userRouter.post("/sign-in", signInUser);
userRouter.get("/me", getMyInformation);

module.exports = userRouter;
