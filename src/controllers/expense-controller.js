const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

exports.findAll = (req, res, next) => {
    res.status(500).send({
        status: false,
        message: "Not implemented"
    });
};

exports.findById = (req, res, next) => {
    res.status(500).send({
        status: false,
        message: "Not implemented"
    });
};

exports.create = (req, res, next) => {
    let expense = new Expense(req.body);
    expense
        .save()
        .then(x => {
            res.status(201).send({
                status: "true",
                id: -1 // TODO
            });
        })
        .catch(e => {
            res.status(400).send({
                status:"false",
                data: e
            });
        });
};

exports.edit = (req, res, next) => {
    res.status(500).send({
        status: false,
        message: "Not implemented"
    });
};

exports.remove = (req, res, next) => {
    res.status(500).send({
        status: false,
        message: "Not implemented"
    });
};