const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
const DUMMY_PAGE = global.DUMMY_PAGE;

describe('/pages API Test', function() {
  it('GETALL should fail if Authorization header not set', function(done) {
    chai.request(server)
    .get('/v1/pages')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(401);
      done();
    })
  })
  it('GETALL should fetch all pages', function(done) {
    chai.request(server)
    .get('/v1/pages')
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.pages).to.be.an('array');
      expect(res.body.success).to.be.true;
      expect(res.status).to.be.equal(200);
      done();
    })
  })
  it('GET should get a new page with id', function(done) {
    chai.request(server)
    .get('/v1/pages/'+DUMMY_PAGE.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.page).to.be.an('object').that.include.all.keys('id', 'name', 'menuId', 'userId');
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('POST should create a new page', function(done) {
    const test_page = {
      name: faker.commerce.productName(),
      menuId: faker.random.uuid(),
      userId: DUMMY_USER.id,
    };
    chai.request(server)
    .post('/v1/pages')
    .set('Authorization', global.HEADER_TOKEN)
    .send(test_page)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.page).to.be.an('object').that.include.all.keys('id', 'name', 'menuId', 'userId');
      expect(res.status).to.be.equal(201);
      done();
    });
  })
  it('PUT should update existing page', function(done) {
    const newPageName = faker.commerce.productName();
    chai.request(server)
    .put('/v1/pages/'+DUMMY_PAGE.id)
    .set('Authorization', global.HEADER_TOKEN)
    .send({
      name: newPageName
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.page).to.be.an('object').that.include.all.keys('id', 'name', 'menuId', 'userId');
      expect(res.body.page.name).to.equal(newPageName);
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('DEL should delete existing page', function(done) {
    chai.request(server)
    .del('/v1/pages/'+DUMMY_PAGE.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(204);
      done();
    });
  })
});