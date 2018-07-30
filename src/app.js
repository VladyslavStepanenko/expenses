'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Routers
const expenseRoute = require('../src/routes/expense-route');

mongoose.connect('mongodb://192.168.43.218:27017/expenses');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/expenses', expenseRoute);

module.exports = app;