const repository = require('../repositories/expense-repository');

exports.getAll = (req, res, next) => {
        repository.findAll()
        .then(data => {
            res.status(200).send({
                status: true,
                expenses:data,
                count: data.length
            });
        })
        .catch(e => {
            res.status(400).send({
                status: false,
                errors: e
            });
        });
};

exports.getById = (req, res, next) => {
        repository.findById(req.params.id)
        .then(data => {
            res.status(200).send({
                status: true,
                expense: data
            });
        })
        .catch(e => {
            res.status(400).send({
                status: false,
                errors: e
            });
        });
};

exports.create = (req, res, next) => {
    repository.add(req.body)
        .then(saved => {
            res.status(201).send({
                status: "true",
                id: saved._id
            });
        })
        .catch(e => {
            res.status(400).send({
                status:"false",
                errors: e
            });
        });
};

exports.edit = (req, res, next) => {
    repository.update(req.params.id, req.body)
        .then(updated => {
            res.status(200).send({
                status: true,
                expense: updated
            });
        }).catch(e => {
            res.status(400).send({
                status: false,
                errors:e
            });
        });
};

exports.delete = (req, res, next) => {
    repository.remove(req.params.id)
        .then(x => {
            res.status(204).send();
        })
        .catch(e => {
            res.status(400).send({
                status: false,
                errors: e
            });
        });
};