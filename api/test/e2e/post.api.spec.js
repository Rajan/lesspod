const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
const DUMMY_POST = global.DUMMY_POST;

describe('/posts API Test', function() {
  it('GETALL should get all posts', function(done) {
    chai.request(server)
    .get('/v1/posts')
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(200);
      done();
    })
  })
  it('GET should get a post with id', function(done) {
    chai.request(server)
    .get('/v1/posts/'+DUMMY_POST.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.post).to.be.an('object').that.include.all.keys('id', 'title', 'author', 'content','tags', 'pageURL');
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('POST should create a new post', function(done) {
    const test_post = {
      title: faker.random.word(),
      author: faker.name.firstName(),
      content: faker.lorem.text(),
      tags: faker.lorem.words(),
      pageURL: faker.internet.url(),
    };
    chai.request(server)
    .post('/v1/posts')
    .set('Authorization', global.HEADER_TOKEN)
    .send(test_post)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.post).to.be.an('object').that.include.all.keys('id', 'title', 'author', 'content','tags', 'pageURL');
      expect(res.status).to.be.equal(201);
      done();
    });
  })
  it('PUT should update an existing post', function(done) {
    const newPostTitle = faker.commerce.productName();
    chai.request(server)
    .put('/v1/posts/'+global.DUMMY_POST.id)
    .set('Authorization', global.HEADER_TOKEN)
    .send({
      title: newPostTitle
    })
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.body.success).to.be.true;
      expect(res.body.post).to.be.an('object').that.include.all.keys('id', 'title', 'author', 'content','tags', 'pageURL');
      expect(res.body.post.title).to.equal(newPostTitle);
      expect(res.status).to.be.equal(200);
      done();
    });
  })
  it('DEL should delete an existing post', function(done) {
    chai.request(server)
    .del('/v1/posts/'+DUMMY_POST.id)
    .set('Authorization', global.HEADER_TOKEN)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.be.equal(204);
      done();
    });
  })
});