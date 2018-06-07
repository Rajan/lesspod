const faker = require('faker');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}
global.HEADER_TOKEN = null;
global.DUMMY_USER = DUMMY_USER;

const HEADER_TOKEN = global.HEADER_TOKEN;
before(function(done) {
  chai.request(server)
  .post('/v1/users')
  .send(DUMMY_USER)
  .end((err, res) => {
    if(!err) {
      global.HEADER_TOKEN = res.body.token;
      DUMMY_USER.id = res.body.user.id;
      console.log('USER', res.body);
      done();
    } else {
      console.log('Some error', err);
      done();
    }
  })
})
before(function(done) {
  chai.request(server)
  .post('/v1/tags')
  .set('Authorization', global.HEADER_TOKEN)
  .send({
    postId: faker.random.uuid(),
    userId: DUMMY_USER.id,
    name: faker.random.word(),
  })
  .end((err, res) => {
    if(!err) {
      console.log('Tag', res.body, 'status', res.status);
      done();
    } else {
      console.log('Some error in tags', err);
      done();
    }
  })
});
describe('/dash API Test', function() {
  it('GET should fail if Authorization header not set', function(done) {
    chai.request(server)
    .get('/v1/dash')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(401);
      done();
    })
  });
  it('GET should return successfully', function(done) {
    chai.request(server)
    .get('/v1/dash')
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.status).to.equal(200);
      done();
    })
  });
});