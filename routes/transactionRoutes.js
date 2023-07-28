const express = require("express");
const {
  getTransactions,
  createTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

const { authenticateUser } = require("../middleware/authenticate");

router.use(authenticateUser);
router.route("/transaction").get(getTransactions);
router.route("/transac").post(createTransaction);
router.route("/transaction/:id").delete(deleteTransaction);

module.exports = router;
