const express = require('express');
const { lendLoan } = require('../controllers/loanController');
const { ledger, accountOverview } = require('../controllers/customerController');
const { makePayment } = require('../controllers/paymentController');

const router = express.Router();
router.post('/lend', lendLoan);
router.get('/ledger/:loan_id', ledger);
router.get('/account-overview/:customer_id', accountOverview);
router.post('/payments', makePayment);

module.exports = router;
