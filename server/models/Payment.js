const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    loan_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Loan", required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["EMI", "LUMP_SUM"], 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now
     }
});

module.exports = mongoose.model('Payment', PaymentSchema);
