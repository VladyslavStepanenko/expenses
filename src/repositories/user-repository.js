const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.add = (data) => {
    let user = new User(data);
    return user.save();
}

exports.findById = (id) => {
    return User.findOne({ _id: id }, 'username email password');
}