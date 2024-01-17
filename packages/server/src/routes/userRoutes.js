const express = require("express");
const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);
userRouter.get("/", getUser);

module.exports = userRouter;
