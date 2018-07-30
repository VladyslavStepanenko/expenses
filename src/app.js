'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://192.168.43.218:27017/expenses', { useNewUrlParser: true });

// Models
const Expense = require('./models/expense');
const User = require('./models/user');

// Routers
const expenseRoute = require('./routes/expense-route');
const userRoute = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/expenses', expenseRoute);
app.use('/users', userRoute);

module.exports = app;