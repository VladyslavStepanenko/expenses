const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.add = (data) => {
    let acc = new Account(data);
    return acc.save();
}

exports.findById = (id) => {
    return Account.findOne({ _id: id }, 'username email password');
}

exports.authenticateByCredentials = (credentials) => {
    return Account.findOne({
        email: credentials.email,
        password: credentials.password
    });
}