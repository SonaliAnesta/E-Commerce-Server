const express = require("express");

const { signUpUser, signInUser, getMyInformation } = require("../services/userService");

const userRouter = express.Router();

userRouter.get("/me", getMyInformation);
userRouter.post("/sign-up", signUpUser);
userRouter.post("/sign-in", signInUser);

module.exports = userRouter;
