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
            res.status(400).send({
                status: false,
                errors: e
            });
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
            res.status(400).send({
                status: false,
                errors: e
            });
        });
};

exports.create = (req, res, next) => {
    let expense = new Expense(req.body);
    expense
        .save()
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
    Expense.findByIdAndUpdate(req.params.id, {
        $set: {
            tag: req.body.tag,
            merchantName: req.body.merchantName,
            total: req.body.total,
            time: req.body.time,
            paymentType: req.body.paymentType,
            photoUrl: req.body.photoUrl
        }
    }).then(x => {
        res.status(200).send({
            status: true,
            id:x._id
        });
    }).catch(e => {
        res.status(400).send({
            status: false,
            errors:e
        });
    });
};

exports.remove = (req, res, next) => {
    Expense.findByIdAndRemove(req.params.id)
        .then(x => {
            res.status(200).send({
                status: true
            });
        })
        .catch(e => {
            res.status(400).send({
                status: false,
                errors: e
            });
        });
};