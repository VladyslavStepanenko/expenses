'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/expenses', expenseRoute);
app.use('/api/account', accountRoute);

module.exports = app;