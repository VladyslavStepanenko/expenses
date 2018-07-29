'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Routers
const expenseRoute = require('../src/routes/expense-route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/expenses', expenseRoute);

module.exports = app;