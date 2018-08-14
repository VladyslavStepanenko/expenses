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
        type: Date
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

schema.pre('save', function(next) {
    this.created_at = new Date();
    next();
});

module.exports = mongoose.model('Expense', schema);