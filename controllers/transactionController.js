const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");

const getTransactions = asyncHandler(async (req,res) => {
	const transactions = await Transaction.find();
	console.log(req.body);
	const count = await Transaction.countDocuments();
	res.status(200).json({
		success: true,
		count,
		data: transactions
	})
})

module.exports = {getTransactions, createTransaction}