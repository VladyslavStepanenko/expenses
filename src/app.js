const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect(config.connectionString, { useNewUrlParser: true });

// Models
const Expense = require('./models/expense');
const Account = require('./models/account');
const Category = require('./models/category');

// Routers
const expenseRoute = require('./routes/ExpenseRoute');
const accountRoute = require('./routes/AccountRoute');
const categoryRoute = require('./routes/CategoryRoute');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use('/api/expenses', expenseRoute);
app.use('/api/account', accountRoute);
app.use('/api/categories', categoryRoute);

module.exports = app;