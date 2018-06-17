const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
const DUMMY_TAG = global.DUMMY_TAG;

describe('/tags API Test', function() {
  it(`POST should fail if Authorization header not set`, function(done) {
    chai.request(server)
    .post('/v1/tags')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(401);
      done();
    })
  });
  it(`POST should create a new tag`, function(done) {
    chai.request(server)
    .post('/v1/tags')
    .send({
      postId: faker.random.uuid(),
      userId: DUMMY_USER.id,
      name: faker.random.word(),
    })
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(201);
      expect(res.body).to.be.ok;
      expect(res.body.tag).to.be.an('object').that.include.all.keys('id', 'name', 'postId', 'userId');
      expect(res.body.success).to.be.true;
      done();
    })
  });
  it(`GET should return a tag`, function(done) {
    chai.request(server)
    .get('/v1/tags/'+DUMMY_TAG.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.tag).to.be.an('object').that.include.all.keys('id', 'name', 'postId', 'userId');
      expect(res.status).to.equal(200);
      done();
    })
  });
  it(`GETALL should return all tags`, function(done) {
    chai.request(server)
    .get('/v1/tags')
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      done();
    })
  });
  it(`PUT should update a tag`, function(done) {
    const newTagName = faker.random.word();
    chai.request(server)
    .put('/v1/tags/'+DUMMY_TAG.id)
    .set('Authorization', global.HEADER_TOKEN)
    .send({
      name: newTagName,
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.tag).to.be.an('object').that.include.all.keys('id', 'name', 'postId', 'userId');
      expect(res.body.tag.name).to.equal(newTagName);
      expect(res.status).to.equal(200);
      done();
    })
  });
  it(`DELETE should remove a tag`, function(done) {
    chai.request(server)
    .del('/v1/tags/'+DUMMY_TAG.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(204);
      done();
    })
  });
});