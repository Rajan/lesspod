const faker = require('faker')
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Register and Login e2e': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    const userData = {
      fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('a[href="/login"]')
      .assert.elementPresent('a[href="/register"]')
      .click('a[href="/register"]')
      .pause(1000)
      .setValue('input[id="fullName"]', userData.fullName)
      .setValue('input[id="email"]', userData.email)
      .setValue('input[id="password"]', userData.password)
      .setValue('input[id="passwordConfirm"]', userData.password)
      .click('a[class = "button is-info"]')
      .pause(1000)
      .assert.urlContains('/home')
      .getCookies(function (result) {
        this.assert.equal(result.value.length, 2) // user and token
        this.assert.equal(result.value[0].name, 'user')
        this.assert.equal(result.value[1].name, 'token')
      })
      .pause(1000)
      .end()
  }
}
