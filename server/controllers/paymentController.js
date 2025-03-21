const mongoose = require('mongoose');
const Loan = require('../models/Loan');
const Payment = require('../models/Payment');

exports.makePayment = async (req, res) => {
    try {
        const { loan_id, amount, type } = req.body;

        if (!mongoose.Types.ObjectId.isValid(loan_id)) {
            return res.status(400).json({ message: "Invalid loan ID format" });
        }

        const loan = await Loan.findById(loan_id);
        if (!loan) return res.status(404).json({ message: "Loan not found" });

        loan.amount_paid += amount;
        const payment = new Payment({ loan_id, amount, type });
        await payment.save();
        loan.transactions.push(payment);

        await loan.save();
        res.json({ message: "Payment successful", amount_paid: loan.amount_paid, balance: loan.total_amount - loan.amount_paid });
    } catch (error) {
        console.error("Error in makePayment:", error);
        res.status(500).json({ error: error.message });
    }
};
