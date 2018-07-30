const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

exports.findAll = () => {
    return Expense.find({});
}

exports.findById = (id) => {
    return Expense.findById(id);
}

exports.add = (data) => {
    let expense = new Expense(data);
    return expense.save();
}

exports.update = (id, data) => {
    return Expense.findByIdAndUpdate(id, {
        $set: {
            tag: data.tag,
            merchantName: data.merchantName,
            total: data.total,
            time: data.time,
            paymentType: data.paymentType,
            photoUrl: data.photoUrl
        }
    });
}

exports.remove = (id) => {
    return Expense.findByIdAndRemove(id);
}