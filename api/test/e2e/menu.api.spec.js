const chai = require('chai');
const faker = require('faker');
const { expect } = chai;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const server = require('../../../index');

const DUMMY_USER = global.DUMMY_USER;
describe('/menu API Test', function() {

});