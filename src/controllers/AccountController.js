const mongoose = require('mongoose');
const Account = mongoose.model('Account');

const repository = require('../repositories/account-repository');
const authHelper = require('../auth/auth-helper');
const ValidationContract = require('../validators/fluent-validator');

exports.register = (req, res, next) => {
    let validationContract = new ValidationContract();
    validationContract.hasMinLen('Username', req.body.username, 4, 'Username should be at least 4 characters');
    validationContract.hasMaxLen('Username', req.body.username, 20, 'Username should not be more than 20 characters');
    validationContract.hasMinLen('Password', req.body.password, 4, 'Password should be at least 4 characters');
    validationContract.hasMaxLen('Password', req.body.password, 20, 'Password should not be more than 25 characters');
    validationContract.isEmail('Email', req.body.email, 'Invalid email');

    let errors = [];

    if(!validationContract.isValid()) {
        validationContract.errors().forEach(item => {
            errors.push({
                message: item.message
            });
        });

        res.status(400).send({
            errors: errors
        });
    } 
    else {
        const account = new Account(req.body);
        account.save()
        .then(saved => {
            res.status(201).send({
                account:saved
            });
        })
        .catch(e => {
            console.log(e);
            errors.push({
                message: "This username already in use"
            });
            res.status(400).send({
                errors: errors
            });
        });
    }
}

exports.login = (req, res, next) => {
    let errors = [];

    Account.findOne({ username: req.body.username })
        .then(account => {
            if(!account) {
                errors.push({
                    message: 'Bad credentials'
                });
                return res.status(403).send({
                    errors: errors
                });
            }

            account.comparePassword(req.body.password, (err, isMatch) => {
                if(err) {
                    errors.push({
                        message: 'Bad credentials'
                    });
                    return res.status(403).send({
                        errors: errors
                    });
                }

                if(!isMatch) {
                    errors.push({
                        message: 'Bad credentials'
                    });
                    return res.status(403).send({
                        errors: errors
                    });
                }

                const token = authHelper.generateToken({
                    id: account._id,
                    username: account.username,
                    password: account.password
                });
    
                res.status(200).send({
                    account:account,
                    token: token
                });
            });
        }).catch(e => {
            console.log(e);
            errors.push({
                message: "An error occured while logging in"
            });
            res.status(500).send({
                errors: errors
            });
        });
}

exports.getProfile = (req, res, next) => {
    let accountId = authHelper.decodeToken(req.get('x-access-token')).id;
    repository.findById(accountId)
        .then(account => {
            res.status(200).send({
                account: account
            });
        })
        .catch(e => {
            res.status(400).send({
                errors: e
            });
        });
}