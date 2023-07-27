const express = require('express');
const { getTransactions, createTransaction } = require('../controllers/transactionController');
const router = express.Router();

const {authenticateUser} = require('../middleware/authenticate');

router.route('/transaction').get(getTransactions);
router.route('/transac').post(authenticateUser, createTransaction);

module.exports = router;