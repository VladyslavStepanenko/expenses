const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const config = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect(config.connectionString, { useNewUrlParser: true });

// Models
const Expense = require('./models/expense');
const Account = require('./models/account');

// Routers
const expenseRoute = require('./routes/expense-route');
const accountRoute = require('./routes/account-route');

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/expenses', expenseRoute);
app.use('/api/account', accountRoute);

module.exports = app;