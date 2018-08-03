const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const app = require('../app');
const Account = require('../models/account');
const authHelper = require('../auth/auth-helper');

chai.use(chaiHttp);

describe('Account test', () => {
    afterEach((done) => {
        Account.remove({}, (err) => {
            done();
        });
    });

    describe('POST /account/login', () => {
        let accountInfo = {
            username: 'keso',
            password: 'keso123',
            email: 'keso@mail.com'
        };

        before((done) => {
            let account = new Account(accountInfo);
            account.save()
                .then(saved => {
                    done();
                }).catch(err => {
                    throw err;
                });
        });


        it('should return token by specified credentials', (done) => {
            chai.request(app)
                .post('/api/account/login')
                .send({
                    username: accountInfo.username,
                    password: accountInfo.password
                }).then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body.token).to.be.exist;
                    done();
                });
        });
    });

    describe('POST /account/register', () => {
        it('should return account info of registered user', (done) => {
            chai.request(app)
                .post('/api/account/register')
                .send({
                    username: "valera",
                    password: "valera123",
                    email: "valera@mail.com"
                }).then(res => {
                    expect(res).to.be.status(201);
                    expect(res.body.account).to.be.an('object');
                    expect(res.body.account.username).to.be.eq('valera');
                    done();
                });
        });

        it('should return an error', (done) => {
            chai.request(app)
                .post('/api/account/register')
                .send({
                    username: 'a',
                    password: 'oerhoiutnoertjrotjoieajrtlrjijerotjnrvtviojrrrrrrrrrrrrrrrrrrrrrrrrrrrrraetl;rsvdts;t',
                    email: 'invalid_email'
                }).then(res => {
                    console.warn(res.body);
                    expect(res).to.be.status(400);
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors).to.be.not.empty;
                    done();
                });
        });
    });

    describe('GET /account', () => {
        let accountInfo = {
            username: 'keso',
            password: 'keso123',
            email: 'keso@mail.com'
        };
        let token;
        before((done) => {
            let account = new Account(accountInfo);
            account.save()
                .then(saved => {
                    token = authHelper.generateToken({
                        id: saved._id,
                        username: saved.username,
                        password: saved.password
                    });
                    done();
                }).catch(err => {
                    throw err;
                });
        });

        it('should return account info by specified token', (done) => {
            chai.request(app)
                .get('/api/account')
                .set('x-access-token', token)
                .then(res => {
                    expect(res).to.be.status(200);
                    expect(res.body.account._id).to.be.exist;
                    expect(res.body.account.username).to.be.exist;
                    expect(res.body.account.username).to.be.eq(accountInfo.username);
                    expect(res.body.account.email).to.be.exist;
                    expect(res.body.account.email).to.be.eq(accountInfo.email);
                    done();
                });
        });
    });
});