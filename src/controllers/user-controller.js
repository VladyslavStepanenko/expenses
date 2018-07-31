const repository = require('../repositories/user-repository');
const authHelper = require('../auth/auth-helper');

exports.register = (req, res, next) => {
    repository.add(req.body)
        .then(x => {
            res.status(201).send({
                status: true,
                id: x._id
            });
        })
        .catch(e => {
            res.status(400).send({
                status: false,
                errors: e
            });
        });
}

exports.getProfile = (req, res, next) => {
    repository.findById(req.params.id)
        .then(user => {
            res.status(200).send({
                status: true,
                data: user
            });
        })
        .catch(e => {
            res.status(400).send({
                status: false,
                errors: e
            });
        });
}

exports.authenticate = (req, res, next) => {
    repository.authenticateByCredentials({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        // generate token
        const token = authHelper.generateToken({
            email: user.email,
            password: user.password
        });

        res.status(200).send({
            status: true,
            token: token
        });
    }).catch(e => {
        res.status(500).send({
            status: false,
            errors: e
        });
    });
}