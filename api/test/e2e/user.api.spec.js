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
      expect(err).to.be.null;
      expect(res.body.success).to.be.false;
      expect(res.body.error).to.be.ok;
      expect(res.status).to.be.at.least(400);
      done();
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
      expect(err).to.be.null;
      expect(res.body.success).to.be.false;
      expect(res.body.error).to.be.ok;
      expect(res.status).to.be.at.least(400);
      done();
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
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.error).to.be.undefined;
      expect(res.status).to.be.equal(201);
      expect(res.body.user).to.be.ok;
      done();
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
      expect(err).to.be.null;
      expect(res.status).to.be.at.least(400);
      expect(res.body.success).to.be.false;
      expect(res.body.error).to.be.ok;
      done();
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
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body.token).to.be.ok;
      expect(res.body.user).to.be.ok;
      expect(res.body.user.email).to.equal(DUMMY_USER.email);
      done();
    })
  });
  it('GET user should fail if Authorization header not set', function(done) {
    chai.request(server)
    .get('/v1/users')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(401);
      done();
    })
  });
  it('GET user should return user successfully', function(done) {
    chai.request(server)
    .get('/v1/users')
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body.user).to.be.ok;
      expect(res.body.user.email).to.equal(DUMMY_USER.email);
      done();
    })
  });
  it(`PUT should fail if Authorization header not set`, function(done) {
    chai.request(server)
    .put('/v1/users')
    .send({
        'first': faker.name.firstName(),
      })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(401);
      done();
    })
  });
  it(`PUT should update user successfully`, function(done) {
    chai.request(server)
    .put('/v1/users')
    .set('Authorization', global.HEADER_TOKEN)
    .send({
        'first': faker.name.firstName(),
      })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body.success).to.be.true;
      done();
    })
  });
  it(`DELETE should fail if Authorization header not set`, function(done) {
    chai.request(server)
    .del('/v1/users')
    .send({})
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(401);
      done();
    })
  });
  it(`DELETE should remove user successfully`, function(done) {
    chai.request(server)
    .del('/v1/users')
    .set('Authorization', global.HEADER_TOKEN)
    .send({})
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(204);
      done();
    })
  });
});