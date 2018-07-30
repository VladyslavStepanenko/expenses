const repository = require('../repositories/user-repository');

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