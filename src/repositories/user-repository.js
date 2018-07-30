const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.add = (data) => {
    let user = new User(data);
    return user.save();
}