const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    tag: {
        type: String,
        required: true
    },
    merchantName: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    paymentType: {
        type: String,
        required: true,
        enum: ['Cash', 'Credit Card'],
    },
    photoUrl: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
});

module.exports = mongoose.model('Expense', schema);