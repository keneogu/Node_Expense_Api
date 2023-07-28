const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user_id: req.user.id });
  const count = await Transaction.countDocuments();
  res.status(200).json({
    success: true,
    count,
    data: transactions,
  });
});

const createTransaction = asyncHandler(async (req, res) => {
  const { amount, category, type, desc } = req.body;

  if (!amount || !category || !type || !desc) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const transaction = await Transaction.create({
    amount,
    category,
    type,
    desc,
    user_id: req.user.id,
  });

  console.log(req.user);
  res.status(201).json({
    success: true,
    data: transaction,
  });
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
	
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  if (transaction.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission for this action");
  }

  await Transaction.deleteOne({ _id: req.params.id });
  res.status(200).json({
		success: true
	});
});

module.exports = { getTransactions, createTransaction, deleteTransaction };
