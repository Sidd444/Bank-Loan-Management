const Loan = require('../models/Loan');

exports.ledger = async (req, res) => {
    try {
        const { loan_id } = req.params;
        const loan = await Loan.findById(loan_id).populate("transactions");
        if (!loan) return res.status(404).json({ message: "Loan not found" });

        const balance = loan.total_amount - loan.amount_paid;
        const emi_left = Math.ceil(balance / loan.emi);

        res.json({ transactions: loan.transactions, balance, emi_left, emi: loan.emi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.accountOverview = async (req, res) => {
    try {
        const { customer_id } = req.params;
        const loans = await Loan.find({ customer_id });

        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
