const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.pre('save', function(next) {
    let account = this;
    if(!account.isModified('password')) {
        return next();
    }
    bcrypt.genSalt()
        .then(salt => {
            bcrypt.hash(account.password, salt)
                .then(hash => {
                    account.password = hash;
                    next();
                })
                .catch(err => {
                    next(err);
                });
        })
        .catch(err => {
            next(err);
        });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password)
    .then(isMatch => {
        cb(null, isMatch);
    })
    .catch(err => {
        return cb(err);
    });
}

module.exports = mongoose.model('Account', schema);