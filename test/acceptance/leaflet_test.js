
Feature('Render The Map');

Scenario('CartoDB loads the leaflet map', function* (I) {

  I.amOnPage('/test/examples/leaflet.html');

  I.seeInTitle('CartoDB.js example');

  let cartodbType = yield I.executeScript(function () {
    return typeof CartoDB;
  });

  let assert = require('assert');

  // CartoDB library is loaded
  assert.equal(cartodbType, 'function');

  // Map is initalized
  I.seeElement('#map.leaflet-container');

  // It draws 3 layers
  I.waitNumberOfVisibleElements('#map .leaflet-layer', 3);
});
