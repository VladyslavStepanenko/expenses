const repository = require('../repositories/account-repository');
const authHelper = require('../auth/auth-helper');
const ValidationContract = require('../validators/fluent-validator');

exports.register = (req, res, next) => {
    let validationContract = new ValidationContract();
    validationContract.isRequired('Username', req.body.username, 'Username is required');
    validationContract.hasMinLen('Username', req.body.username, 4, 'Username should be at least 4 characters');
    validationContract.hasMaxLen('Username', req.body.username, 20, 'Username should not be more than 20 characters');

    validationContract.isRequired('Password', req.body.password, 'Password is required');
    validationContract.hasMinLen('Password', req.body.password, 4, 'Password should be at least 4 characters');
    validationContract.hasMaxLen('Password', req.body.password, 20, 'Password should not be more than 25 characters');

    validationContract.isRequired('Email', req.body.email, 'Email is required');
    validationContract.isEmail('Email', req.body.email, 'Invalid email');

    if(!validationContract.isValid()) {
        console.log('is invalid');
        errors = [];
        validationContract.errors().forEach(item => {
            errors.push({
                field: item.field,
                message: item.message
            });
        });

        res.status(400).send({
            errors: errors
        });
    } 
    else {
        console.log('is valid');
        repository.add(req.body)
        .then(saved => {
            res.status(201).send({
                account:saved
            });
        })
        .catch(e => {
            res.status(500).send({
                errors: e
            });
        });
    }
}

exports.login = (req, res, next) => {
    repository.findByCredentials({
        username: req.body.username,
        password: req.body.password
    }).then(account => {
        if(!account) {
            res.status(403).send({
                message: 'Bad credentials'
            });
        } 
        else {
            // generate token
            const token = authHelper.generateToken({
                id: account._id,
                username: account.username,
                password: account.password
            });

            res.status(200).send({
                token: token
            });
        }
    }).catch(e => {
        res.status(500).send({
            errors: e
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