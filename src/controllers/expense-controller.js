const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

exports.findAll = (req, res, next) => {
    Expense.find({})
        .then(data => {
            res.status(200).send({
                status: true,
                expenses:data,
                count: data.length
            });
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.findById = (req, res, next) => {
    Expense.findById(req.params.id)
        .then(data => {
            res.status(200).send({
                status: true,
                expense: data
            });
        })
        .catch(e => {
            res.status(400).send(e);
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