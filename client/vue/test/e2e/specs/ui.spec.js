const faker = require('faker')
const { expect } = require('chai')
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
// const server = require('../../../../../index')

const DUMMY_USER = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}
module.exports = {
  after: function (browser, done) {
    browser.end()
    done()
  },
  'Register e2e': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const userData = {
      fullName: DUMMY_USER.first + ' ' + DUMMY_USER.last,
      email: DUMMY_USER.email,
      password: DUMMY_USER.password
    }
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('a[href="/login"]')
      .assert.elementPresent('a[href="/register"]')
      .click('a[href="/register"]')
      .pause(2000)
      .setValue('input[id="fullName"]', userData.fullName)
      .setValue('input[id="email"]', userData.email)
      .setValue('input[id="password"]', userData.password)
      .setValue('input[id="passwordConfirm"]', userData.password)
      .click('a[class = "button is-info"]')
      .pause(10000)
      .assert.urlContains('/home')
      .getCookies(function (result) {
        this.assert.equal(result.value.length, 3) // user and token
        const actualKeys = result.value.map(k => k.name)
        const expectedKeys = ['user', 'token']
        expect(actualKeys).to.include.members(expectedKeys)
      })
      .pause(2000)
      .moveToElement('#profile', 10, 10)
      .click('#signout')
      .pause(2000)
  },
  'Login e2e': function (browser) {
    // const devServer = browser.globals.devServerURL
    browser
      .assert.elementPresent('a[href="/login"]')
      .assert.elementPresent('a[href="/register"]')
      .click('a[href="/login"]')
      .pause(10000)
      .setValue('input[id="email"]', DUMMY_USER.email)
      .setValue('input[id="password"]', DUMMY_USER.password)
      .pause(2000)
      .click('a[class="button is-info"]')
      .pause(10000)
      .assert.urlContains('/home')
      .getCookies(function (result) {
        this.assert.equal(result.value.length, 3) // user and token
        const actualKeys = result.value.map(k => k.name)
        const expectedKeys = ['user', 'token']
        expect(actualKeys).to.include.members(expectedKeys)
      })
      .pause(2000)
  },
  'Post e2e': function (browser) {
    browser
      .click('p a[href="../newpost"]')
      .pause(10000)
      .setValue('input[id="title"]', faker.random.word())
      .click('div[contenteditable=true]')
      .pause(1000)
      .setValue('div[contenteditable=true]', faker.lorem.text())
      .pause(2000)
      .click('a[class="button is-primary"]')
      .pause(2000)
  },
  'Menu e2e': function (browser) {
    browser
      .moveToElement('#create-new', 10, 10)
      .click('#new-menu')
      .pause(10000)
      .setValue('input[placeholder="About Us"]', faker.lorem.word())
      .setValue('input[placeholder="http://www.example.com"]', faker.internet.url())
      .pause(2000)
      .click('button[class="button is-success is-small"]')
      .pause(2000)
  }
}
