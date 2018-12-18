// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'data table e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('.data-table-wrapper table tbody tr', 5000)
      .assert.elementPresent('.data-table-wrapper')
      .assert.containsText('.title', 'Payment Data')
      .assert.elementCount('table', 1)
      .click('#search')
      .pause(1000)
      .getCssProperty('#search', 'width', function(result) {
        this.assert.equal(result.value, '220px');
      })
      .click('table tbody tr:first-child td:first-child')
      .waitForElementVisible('table tbody tr:first-child td:first-child .f-icon', 1000)
      .click('table tbody tr:first-child td:first-child .f-icon')
      .waitForElementVisible('.editor-overlay', 1000)
      .isVisible('.editor-overlay', function(result) {
        this.assert.equal(result.value, true);
      })
      .pause(1000)
      .click('.close-overlay')
      .waitForElementNotPresent('.editor-overlay', 1000)
      .pause(500)
      .end()
  }
}
