const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

exports.getAll = (req, res, next) => {
    Expense.find({ account: req.accountId })
        .then(data => {
            res.status(200).send({
                expenses: data,
                count: data.length
            });
        })
        .catch(e => {
            res.status(500).send({
                message: "An error occured trying to fetch the expenses"
            });
        });
};

exports.getById = (req, res, next) => {
    Expense.findById(req.params.id)
        .then(data => {
            res.status(200).send({
                expense: data
            });
        })
        .catch(e => {
            res.status(400).send({
                error: {
                    message: "?"
                }
            });
        });
};

exports.create = (req, res, next) => {
    const expense = new Expense(req.body);
    expense.save()
        .then(saved => {
            res.status(201).send({
                expense: saved
            });
        })
        .catch(e => {
            res.status(400).send({
                errors: e
            });
        });
};

exports.edit = (req, res, next) => {
    Expense.findByIdAndUpdate(req.params.id, {
        $set: {
            tag: req.body.tag,
            merchantName: req.body.merchantName,
            total: req.body.total,
            paymentType: req.body.paymentType,
            category: req.body.category,
            photoUrl: req.body.photoUrl
        }, }, { new: true })
        .then(updated => {
            res.status(200).send({
                expense: updated
            });
        }).catch(e => {
            res.status(400).send({
                errors: e
            });
        });
};

exports.delete = (req, res, next) => {
    Expense.findByIdAndRemove(req.params.id)
        .then(x => {
            res.status(204).send();
        })
        .catch(e => {
            res.status(400).send({
                errors: e
            });
        });
};