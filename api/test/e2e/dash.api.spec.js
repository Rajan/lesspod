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
  token: null,
}
global.DUMMY_USER = DUMMY_USER;
before(function(done) {
  chai.request(server)
  .post('/v1/users')
  .send(DUMMY_USER)
  .end((err, res) => {
    if(!err) {
      DUMMY_USER.token = res.body.token
      done();
    } else {
      console.log('Some error', err);
    }
  })
})
describe('HomeController Test', function() {
  it('should return 401 status if user is not logged in', function(done) {
    chai.request(server)
    .get('/v1/dash')
    .set('Authorization', DUMMY_USER.token)
    .end((err, res) => {
      if(err) {
        expect(true).to.be.false;
        done();
      } else {
        expect(res.body.success).to.be.true;
        expect(res.status).to.equal(200);
        done();
      }
    })
  });
});