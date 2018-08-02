const Expense = require('../models/expense');

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

describe('Expenses test', () => {
    afterEach((done) => {
        Expense.remove({}, (err) => {
            if(err) {
                throw err;
            }
            done();
        });
    });

    describe('GET /expenses', () => {
        it('should return no expenses at start', (done) => {
            chai.request(app)
                .get('/api/expenses')
                .then(res => {
                    expect(res).to.be.json;
                    expect(res).to.be.an('object');
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.eq(true);
                    expect(res.body.expenses).to.be.an('array');
                    expect(res.body.count).to.eq(0);
                    done();
                });
        });
    });

    describe('GET /api/expenses/:id', () => {
        let expenseId;
        var expense = new Expense({
            tag: "tag",
            merchantName: "merch",
            total: 3,
            paymentType: "Cash",
            category: '5b631164e7179a073344c956',
            account: "5b636ca2fb6fc072a40eca06"
        });

        before((done) => {
            expense.save()
                .then(saved => {
                    expenseId = saved._id;
                    done();
                })
                .catch(e => {
                    console.warn(e);
                });
        });

        it('should return expense with specified id', (done) => {
            chai.request(app)
                .get(`/api/expenses/${expenseId}`)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.expense.paymentType).to.be.eq(expense.paymentType);
                    done();
                });
        });
    });

    describe('POST /api/expenses', () => {
        it('should return id of saved expense', (done) => {
            chai.request(app)
                .post('/api/expenses')
                .send({
                    tag: "tag",
                    merchantName: "merch",
                    total: 3,
                    paymentType: "Cash",
                    category: '5b631164e7179a073344c956',
                    account: "5b636ca2fb6fc072a40eca06"
                })
                .then(res => {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body.id).to.be.exist;
                    done();
                });
        });
    });

    describe('PUT /api/expenses/:id', () => {
        let expenseId;
        var expense = new Expense({
            tag: "tag",
            merchantName: "merch",
            total: 3,
            paymentType: "Cash",
            photoUrl: "old_photo",
            category: '5b631164e7179a073344c956',
            account: "5b636ca2fb6fc072a40eca06"
        });

        before((done) => {
            expense.save()
                .then(saved => {
                    expenseId = saved._id;
                    done();
                })
                .catch(e => {
                    console.warn(e);
                });
        });

        it('should return expense with edited info', (done) => {
            let url = 'keso';
            chai.request(app)
                .put(`/api/expenses/${expenseId}`)
                .send({
                    photoUrl: url
                }).then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body.expense.photoUrl).to.eq(url);
                    done();
                });
        });
    });

    describe('DELETE /api/expense', (done) => {
        let expenseId;
        var expense = new Expense({
            tag: "tag",
            merchantName: "merch",
            total: 3,
            paymentType: "Cash",
            photoUrl: "old_photo",
            category: '5b631164e7179a073344c956',
            account: "5b636ca2fb6fc072a40eca06"
        });

        before((done) => {
            expense.save()
                .then(saved => {
                    expenseId = saved._id;
                    done();
                })
                .catch(e => {
                    console.warn(e);
                });
        });

        it('should return no content if delete was successfull', (done) => {
            chai.request(app)
                .del(`/api/expenses/${expenseId}`)
                .then(res => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    })
});
