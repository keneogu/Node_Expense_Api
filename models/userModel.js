const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your firstName"],
    trim: true,
    maxlength: [50, "Name is too long"],
  },
	lastName: {
    type: String,
    required: [true, "Please enter your lastName"],
    trim: true,
    maxlength: [50, "Name is too long"],
  },
	username: {
		type: String,
    required: [true, "Please enter your username"],
    trim: true,
    unique: [true, "Username already exists"],
    maxlength: [10, "Name is too long"],
	},
  email: {
    type: String,
    required: [true, "Enter your Email"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password too short, must be longer than 6 char"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);