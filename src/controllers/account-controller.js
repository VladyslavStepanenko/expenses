const repository = require('../repositories/account-repository');
const authHelper = require('../auth/auth-helper');

exports.register = (req, res, next) => {
    repository.add(req.body)
        .then(saved => {
            res.status(201).send({
                account:saved
            });
        })
        .catch(e => {
            res.status(400).send({
                errors: e
            });
        });
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

            const tokenData = authHelper.decodeToken(token);

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