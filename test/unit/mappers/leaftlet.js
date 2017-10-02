import Leaflet from '../../../src/mappers/leaflet.js';

describe('Leaflet', function ()  {

  var domElement = '#map',
      config = {
        zoom: 4,
        center: [52.5897007687178, 52.734375]
      },
      leaflet;

  global.L = {
    map: () => {},
    tileLayer: () => {}
  };

  describe('initialized', function () {

    it('should call L.map', (done) => {

      var mock = sandbox.mock(global.L);

      mock.expects('map');

      leaflet = new Leaflet(domElement, config);

      let timer = setInterval(() => {
        if (leaflet._isReady()) {
          clearInterval(timer);
          mock.verify();
          done();
        }
      }, 20);
    })
  })

  describe('setLayer', function () {

    var layer = {
      urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      minZoom: '0',
      maxZoom: '18',
      attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
    }

    it('should call L.tileLayer', function (done) {

      var mock = sandbox.mock(global.L);
      mock.expects('tileLayer').returns({
        addTo: () => {}
      });

      leaflet = new Leaflet(domElement, config);

      leaflet.setLayer(layer);

      let timer = setInterval(() => {
        if (leaflet._isReady()) {
          clearInterval(timer);
          mock.verify();
          done();
        }
      }, 20);
    })
  })
});
