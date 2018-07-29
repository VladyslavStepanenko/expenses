// Simple storage
var expenses = [];

function findById(id) {
    return expenses.find(id);
}

function add(expense) {
    expenses.push(expense);
}

function edit(expense) {
    expenses[expense.id] = expense;
}

exports.getAll = (req, res, next) => {
    res.status(200).send({
        status:"ok",
        expenses:expenses
    });
};

exports.find = (req, res, next) => {
    const id = req.params.id;
    let expense = findById(id);
    res.status(200).send({
        status:"ok",
        expense:expense
    });
};

exports.create = (req, res, next) => {
    let expense = req.body;
    add(expense);
    res.status(201).send({
        status:"saved",
        id:expenses.findIndex(expense)
    });
};

exports.edit = (req, res, next) => {
    const id = req.params.id;
    let expense = req.body;
    edit(expense);
    res.status(201).send({
        status:"edited"
    });
};

exports.remove = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        status:"deleted"
    });
};