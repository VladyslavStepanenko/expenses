const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.getAll = async(req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).send({
            categories: categories,
            count: categories.length
        });
    }
    catch(err) {
        res.status(500).send({
            message: "An error occured when trying to fetch categories"
        });
    }
}