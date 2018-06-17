const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
const DUMMY_COMPANY = global.DUMMY_COMPANY;


describe('/company API Test', function() {
  it('GET should fail if Authorization header not set', function(done) {
    chai.request(server)
    .get('/v1/companies')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(401);
      done();
    })
  })
  it.skip('GETALL should get all companies', function(done) {
    chai.request(server)
    .get('/v1/companies')
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(200);
      done();
    })
  })
  it.skip('GET should get a company with id', function(done) {
    chai.request(server)
    .get('/v1/companies/'+DUMMY_COMPANY.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.company).to.be.an('object').that.include.all.keys('id', 'name');
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('POST should create a new company', function(done) {
    const test_company = {
      name: faker.random.word(),
    };
    chai.request(server)
    .post('/v1/companies')
    .set('Authorization', global.HEADER_TOKEN)
    .send(test_company)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.company).to.be.an('object').that.include.all.keys('id', 'name');
      expect(res.status).to.be.equal(201);
      done();
    });
  })
  it.skip('PUT should update an existing company', function(done) {
    const newCompanyName = faker.lorem.word();
    chai.request(server)
    .put('/v1/companies/'+DUMMY_COMPANY.id)
    .set('Authorization', global.HEADER_TOKEN)
    .send({
      name: newCompanyName
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.company).to.be.an('object').that.include.all.keys('id', 'name');
      expect(res.body.company.name).to.equal(newCompanyName);
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it.skip('DEL should delete an existing company', function(done) {
    chai.request(server)
    .del('/v1/companies/'+DUMMY_COMPANY.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(204);
      done();
    });
  })
});