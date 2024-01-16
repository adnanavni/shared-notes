const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (username, password) {
  if (!username || !password) throw new Error("Missing username or password");
  if (username.length < 3 || username.length > 20)
    throw new Error("Username must be between 3 and 20 characters");
  if (password.length < 8)
    throw new Error("Password must be at least 8 characters");

  const exists = await this.findOne({ username });
  if (exists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new this({ username, password: hashedPassword });
  await user.save();

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) throw new Error("All fields are required");

  const user = await this.findOne({ username });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect password");

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;