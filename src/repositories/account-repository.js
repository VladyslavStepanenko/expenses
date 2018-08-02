const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.add = (data) => {
    let acc = new Account(data);
    return acc.save();
}

exports.findById = (id) => {
    return Account.findOne({ _id: id });
}

exports.findByCredentials = (credentials) => {
    return Account.findOne({
        username: credentials.username,
        password: credentials.password
    });
}