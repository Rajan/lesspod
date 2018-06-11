const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
const DUMMY_MENU = global.DUMMY_MENU;

describe('/menu API Test', function() {
  it('GETALL should get all menus', function(done) {
    chai.request(server)
    .get('/v1/menus')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(200);
      done();
    })
  })
  it('GET should get a menu with id', function(done) {
    chai.request(server)
    .get('/v1/menus/'+DUMMY_MENU.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.menu).to.be.an('object').that.include.all.keys('id', 'name', 'linkedURL', 'linkedPage','postId');
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('POST should create a new menu', function(done) {
    const test_menu = {
      name: faker.lorem.word(),
      linkedURL: faker.internet.url(),
      linkedPage: faker.random.word(),
      postId: faker.random.uuid(),
    };
    chai.request(server)
    .post('/v1/menus')
    .set('Authorization', global.HEADER_TOKEN)
    .send(test_menu)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.menu).to.be.an('object').that.include.all.keys('id', 'name', 'linkedURL', 'linkedPage','postId');
      expect(res.status).to.be.equal(201);
      done();
    });
  })
  it('PUT should update an existing menu', function(done) {
    const newMenuName = faker.lorem.word();
    chai.request(server)
    .put('/v1/menus/'+DUMMY_MENU.id)
    .set('Authorization', global.HEADER_TOKEN)
    .send({
      name: newMenuName
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.menu).to.be.an('object').that.include.all.keys('id', 'name', 'linkedURL', 'linkedPage','postId');
      expect(res.body.menu.name).to.equal(newMenuName);
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('DEL should delete an existing menu', function(done) {
    chai.request(server)
    .del('/v1/menus/'+DUMMY_MENU.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(204);
      done();
    });
  })
});