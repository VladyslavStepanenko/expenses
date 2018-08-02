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
const User = require('./models/user');

// Routers
const expenseRoute = require('./routes/expense-route');
const accountRoute = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/expenses', expenseRoute);
app.use('/api/account', accountRoute);

module.exports = app;