
Feature('Render The Map');

Scenario('test cartodb is loaded', function* (I) {

  I.amOnPage('/test/examples/base.html');

  I.seeInTitle('CartoDB.js example');

  let cartodbType = yield I.executeScript(function () {
    return typeof CartoDB;
  });

  let assert = require('assert');

  assert.equal(cartodbType, 'object');
});
