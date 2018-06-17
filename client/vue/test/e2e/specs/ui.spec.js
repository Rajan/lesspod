const faker = require('faker')

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
  // before: function (browser, done) {
  // },
  'Register e2e': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    const userData = {
      fullName: DUMMY_USER.first + ' ' + DUMMY_USER.last,
      email: DUMMY_USER.email,
      password: DUMMY_USER.password
    }
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('a[href="/login"]')
      .assert.elementPresent('a[href="/register"]')
      .click('a[href="/register"]')
      .pause(2000)
      .setValue('input[id="fullName"]', userData.fullName)
      .setValue('input[id="email"]', userData.email)
      .setValue('input[id="password"]', userData.password)
      .setValue('input[id="passwordConfirm"]', userData.password)
      .click('a[class = "button is-info"]')
      .pause(2000)
      .assert.urlContains('/home')
      .getCookies(function (result) {
        this.assert.equal(result.value.length, 2) // user and token
        this.assert.equal(result.value[0].name, 'user')
        this.assert.equal(result.value[1].name, 'token')
      })
      .pause(2000)
      .moveToElement('#profile', 10, 10)
      .click('#signout')
  },
  'Login e2e': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('a[href="/login"]')
      .assert.elementPresent('a[href="/register"]')
      .click('a[href="/login"]')
      .pause(2000)
      .setValue('input[id="email"]', DUMMY_USER.email)
      .setValue('input[id="password"]', DUMMY_USER.password)
      .pause(2000)
      .click('a[class="button is-info"]')
      .pause(2000)
      .assert.urlContains('/home')
      .getCookies(function (result) {
        this.assert.equal(result.value.length, 2) // user and token
        this.assert.equal(result.value[0].name, 'user')
        this.assert.equal(result.value[1].name, 'token')
      })
      .pause(2000)
      .end()
  }
}
