const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
describe('/users API Test', function() {
  it('signup should fail if email not provided', function(done) {
    chai.request(server)
    .post('/v1/users')
    .send({
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      password: faker.internet.password(),
    })
    .end((err, res) => {
      if (err) {
        expect(true).to.be.false;
        done();
      } else {
        expect(res.body.success).to.be.false;
        expect(res.body.error).to.be.ok;
        expect(res.status).to.be.at.least(400);
        done();
      }
    })
  });
  it('signup should fail if password not provided', function(done) {
    chai.request(server)
    .post('/v1/users')
    .send({
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      email: faker.internet.email(),
    })
    .end((err, res) => {
      if (err) {
        expect(true).to.be.false;
        done();
      } else {
        expect(res.body.success).to.be.false;
        expect(res.body.error).to.be.ok;
        expect(res.status).to.be.at.least(400);
        done();
      }
    })
  });
  it('should signup if all details are provided', function(done) {
    chai.request(server)
    .post('/v1/users')
    .send({
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
    .end((err, res) => {
      if (err) {
        expect(true).to.be.false;
        done();
      } else {
        expect(res.body.success).to.be.true;
        expect(res.body.error).to.be.undefined;
        expect(res.status).to.be.equal(201);
        expect(res.body.user).to.be.ok;
        done();
      }
    })
  });
  it(`shouldn't login user with false cred.`, function(done) {
    chai.request(server)
    .post('/v1/users/login')
    .send({
        'email': faker.internet.email(),
        'password': faker.internet.password()
      })
    .end((err, res) => {
      if(err) {
        expect(true).to.be.false;
      } else {
        expect(res.status).to.be.at.least(400);
        expect(res.body.success).to.be.false;
        expect(res.body.error).to.be.ok;
        done();
      }
    })
  });
  it('should login user with correct cred.', function(done) {
    chai.request(server)
    .post('/v1/users/login')
    .send({
        'email': DUMMY_USER.email,
        'password': DUMMY_USER.password
      })
    .end((err, res) => {
      if(err) {
        expect(true).to.be.false;
      } else {
        expect(res.status).to.equal(200);
        expect(res.body.token).to.be.ok;
        expect(res.body.user).to.be.ok;
        expect(res.body.user.email).to.equal(DUMMY_USER.email);
        done();
      }
    })
  });
});