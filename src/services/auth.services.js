const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    profilePicture,
    birthdate,
    phoneNumber,
    password,
  } = userData;

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    profilePicture,
    birthdate,
    phoneNumber,
    password: hashedPassword,
  });

  await user.save();
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};
