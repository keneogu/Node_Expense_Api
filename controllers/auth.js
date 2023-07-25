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


module.exports = { registerUser };
