const mongoose = require('mongoose');
const Expense = require('../models/expense');

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

    describe('/GET expenses', function() {
        it('it should get all the books', function() {
            return chai.request(app)
                .get('/expenses')
                .then(function(res) {
                    expect(res).to.be.json;
                    expect(res).to.be.an('object');
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.eq(true);
                    expect(res.body.expenses).to.be.an('array');
                    expect(res.body.count).to.eq(2);
                });
        });
    });