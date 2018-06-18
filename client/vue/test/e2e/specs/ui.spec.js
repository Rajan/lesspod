const faker = require('faker')
const { expect } = require('chai')
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
// const server = require('../../../../../index')

const DUMMY_USER = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  newPassword: faker.internet.password()
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
        this.assert.equal(result.value.length, 2) // user and token
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
        this.assert.equal(result.value.length, 2) // user and token
        const actualKeys = result.value.map(k => k.name)
        const expectedKeys = ['user', 'token']
        expect(actualKeys).to.include.members(expectedKeys)
      })
      .pause(2000)
  },
  'Post CREATE': function (browser) {
    browser
      .click('p a[href="../newpost"]')
      .pause(10000)
      .setValue('input[id="title"]', faker.random.word())
      .click('div[contenteditable=true]')
      .pause(1000)
      .setValue('div[contenteditable=true]', faker.lorem.text())
      .pause(2000)
      .click('a[class="button is-primary"]')
      .pause(5000)
  },
  'Post VIEW': function (browser) {
    browser
      .refresh()
      .pause(5000)
      .click('div[class="media"] div[class="content "] a:nth-child(6)')
      .pause(1000)
      .assert.urlContains('/post')
      .assert.elementPresent('input[id="title"][readonly="readonly"]')
      .pause(2000)
      .back()
      .pause(2000)
  },
  'Post UPDATE': function (browser) {
    browser
      .click('div[class="media"] div[class="content "] a:nth-child(4)')
      .pause(1000)
      .assert.urlContains('/editpost')
      .setValue('input[id="title"]', ' ' + faker.random.word())
      .setValue('div[contenteditable=true]', ' ' + faker.lorem.text())
      .pause(2000)
      .click('a[class="button is-primary"]')
      .pause(3000)
  },
  'Post DELETE': function (browser) {
    browser
      .click('a[id="typeLogo"]')
      .pause(5000)
      .click('div[class="media"] div[class="content "] a:nth-child(8)')
      .pause(2000)
  },
  'Menu CREATE': function (browser) {
    browser
      .moveToElement('#create-new', 10, 10)
      .click('#new-menu')
      .pause(10000)
      .setValue('input[placeholder="About Us"]', faker.lorem.word())
      .setValue('input[placeholder="http://www.example.com"]', faker.internet.url())
      .pause(2000)
      .click('button[class="button is-success is-small"]')
      .pause(2000)
  },
  'Menu DELETE': function (browser) {
    browser
      .refresh()
      .pause(5000)
      .click('button a[class="tag is-danger is-delete"]')
      .pause(10000)
  },
  'Profile UPDATE': function (browser) {
    browser
      .moveToElement('#profile', 10, 10)
      .click('a[href="/profile"]')
      .pause(2000)
      .setValue('input[id="fullName"]', faker.name.firstName() + ' ' + faker.name.lastName())
      .setValue('input[id="email"]', faker.internet.email())
      .setValue('input[id="password"]', DUMMY_USER.newPassword)
      .setValue('input[id="password-confirm"]', DUMMY_USER.newPassword)
      .pause(2000)
      .click('button[class="button is-info"]')
  },
  'Settings Update': function (browser) {
    browser
      .moveToElement('#profile', 10, 10)
      .click('a[href="/settings"]')
      .pause(2000)
      .setValue('input[id="tagline"]', faker.lorem.sentence())
      .pause(2000)
      .click('button[class="button is-info"]')
  }
}
