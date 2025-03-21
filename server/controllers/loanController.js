const Loan = require('../models/Loan');

exports.lendLoan = async (req, res) => {
    try {
        const { customer_id, principal, tenure, interest_rate } = req.body;
        const interest = (principal * (tenure / 12) * interest_rate) / 100;
        const total_amount = principal + interest;
        const emi = total_amount / tenure;

        const newLoan = new Loan({ customer_id, principal, interest_rate, tenure, total_amount, emi });
        await newLoan.save();

        res.json({ message: "Loan issued", total_amount, emi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
