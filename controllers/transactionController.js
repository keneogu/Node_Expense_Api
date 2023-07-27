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

const createTransaction = asyncHandler(async(req,res) => {

	const {amount, category, type, desc} = req.body

	// const transaction = await Transaction.create(req.body)
	if(!amount || !category || !type || !desc) {
		res.status(400)
		throw new Error("All fields are mandatory")
	}

	const transaction = await Transaction.create({
		amount,
		category,
		type,
		desc,
		user_id: req.user.id
	})

	console.log(req.user)
	res.status(201).json({
		success: true,
		data: transaction
	});

})

module.exports = {getTransactions, createTransaction}