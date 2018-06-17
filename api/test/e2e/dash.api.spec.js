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
};
const DUMMY_PAGE = {
  name: faker.commerce.productName(),
  menuId: faker.random.uuid(),
};
const DUMMY_TAG = {
  postId: faker.random.uuid(),
  name: faker.random.word(),
};
const DUMMY_POST = {
  title: faker.random.word(),
  author: faker.name.firstName(),
  content: faker.lorem.text(),
  tags: faker.lorem.words(),
  pageURL: faker.internet.url(),
};
const DUMMY_MENU = {
  name: faker.lorem.word(),
  linkedURL: faker.internet.url(),
  linkedPage: faker.random.word(),
  postId: faker.random.uuid(),
};
const DUMMY_COMPANY = {
  name: faker.random.word(),
};
global.HEADER_TOKEN = null;
global.DUMMY_USER = DUMMY_USER;
global.DUMMY_TAG = DUMMY_TAG;
global.DUMMY_PAGE = DUMMY_PAGE;
global.DUMMY_POST = DUMMY_POST;
global.DUMMY_MENU = DUMMY_MENU;
global.DUMMY_COMPANY = DUMMY_COMPANY;

const HEADER_TOKEN = global.HEADER_TOKEN;
before(function(done) {
  chai.request(server)
  .post('/v1/users')
  .send(DUMMY_USER)
  .end((err, res) => {
    if(!err) {
      global.HEADER_TOKEN = res.body.token;
      DUMMY_USER.id = res.body.user.id;
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
    postId: DUMMY_TAG.postId,
    name: DUMMY_TAG.name,
    userId: DUMMY_USER.id,
  })
  .end((err, res) => {
    DUMMY_TAG.id = res.body.tag.id;
    DUMMY_TAG.userId = res.body.tag.userId;
    done();
  })
});
before(function(done) {
  chai.request(server)
  .post('/v1/pages')
  .set('Authorization', global.HEADER_TOKEN)
  .send({
    name: DUMMY_PAGE.name,
    menuId: DUMMY_PAGE.menuId,
    userId: DUMMY_USER.id,
  })
  .end((err, res) => {
    DUMMY_PAGE.id = res.body.page.id;
    DUMMY_PAGE.userId = res.body.page.userId;
    done();
  })
})
before(function(done) {
  chai.request(server)
  .post('/v1/posts')
  .set('Authorization', global.HEADER_TOKEN)
  .send(DUMMY_POST)
  .end((err, res) => {
    DUMMY_POST.id = res.body.post.id;
    done();
  })
});
before(function(done) {
  chai.request(server)
  .post('/v1/menus')
  .set('Authorization', global.HEADER_TOKEN)
  .send(DUMMY_MENU)
  .end((err, res) => {
    DUMMY_MENU.id = res.body.menu.id;
    done();
  })
});
before(function(done) {
  chai.request(server)
  .post('/v1/companies')
  .set('Authorization', global.HEADER_TOKEN)
  .send(DUMMY_COMPANY)
  .end((err, res) => {
    DUMMY_COMPANY.id = res.body.company.id;
    done();
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