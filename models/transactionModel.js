const mongoose = require("mongoose");
require("dotenv").config();

const transactionSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	amount: {
    type: Number,
		required: true
  },
	category: {
		type: String,
    required: [true, "Please choose a category"],
	},
	desc: {
		type: String,
		required: [true, "Please add the description"],
	},
  type: {
    type: String,
    required: [true, "Select type"],
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
