const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (_id) => {
  return jsonwebtoken.sign({ _id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser
};