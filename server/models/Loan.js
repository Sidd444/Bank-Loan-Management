const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    customer_id: { type: String, required: true },
    principal: { type: Number, required: true },
    interest_rate: { type: Number, required: true },
    tenure: { type: Number, required: true }, // in months
    total_amount: { type: Number, required: true },
    emi: { type: Number, required: true },
    amount_paid: { type: Number, default: 0 },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }]
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);
