const User = require("../models/userModel");
const tokenHandler = require("../middleware/tokenHandler");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });
  tokenHandler(user, 200, res);
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  }).select("+password");
  if (!user) {
    res.status(401);
    throw new Error("username/email is not valid");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    res.status(401);
    throw new Error("Incorrect Password");
  }

  tokenHandler(user, 200, res);
});

module.exports = { registerUser, loginUser };
