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
                user: user
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
        if(!user) {
            res.status(404).send({
                status: false,
                error: 'User not found'
            });
        }
        // generate token
        const token = authHelper.generateToken({
            email: user.email,
            password: user.password
        });

        const tokenData = authHelper.decodeToken(token);

        res.status(200).send({
            status: true,
            accessToken: {
                value: token,
                expiresAt: tokenData.exp
            }
        });
    }).catch(e => {
        res.status(500).send({
            status: false,
            errors: e
        });
    });
}