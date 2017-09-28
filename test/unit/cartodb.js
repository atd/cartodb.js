import CartoDB from '../../src/cartodb.js';

describe('CartoDB', function () {

  var domElement = '#map',
      mapper = 'leaflet',
      config =  {
        layers: []
      },
      map,
      // Stub requires used by CartoDB
      requires = {
        leaflet: require('../../src/mappers/leaflet.js'),
        cartoMaps: require('../../src/cartoMaps.js')
      }

  describe('constructor', function () {

    var leafletInstance = {},
        cartoMapsInstance = {}

    beforeEach(function () {
      sandbox.stub(requires.leaflet, 'default').returns(leafletInstance);
      sandbox.stub(requires.cartoMaps, 'default').returns(cartoMapsInstance);
    })

    it('should set an object as domElement', function () {
      map = new CartoDB(domElement, mapper, config);

      expect(map.domElement).to.be.an('object');
    });

    it('should set a leaflet instance as mapper', function () {
      map = new CartoDB(domElement, mapper, config);

      expect(map.mapper).to.be.equal(leafletInstance);
    })

    it('should set a cartoMaps instance', function () {
      map = new CartoDB(domElement, mapper, config);

      expect(map.cartoMaps).to.be.equal(cartoMapsInstance);
    })
  });

  describe('called with layers', function () {

    var configWithLayers = {
          layers: [
            {
              type: 'tiled',
              options: {
                urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                minZoom: '0',
                maxZoom: '18',
                attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'
              }
            },
            {
              type: 'CartoDB',
              options: {
                sql: 'select * from european_countries_e',
                cartocss: '/** choropleth visualization */\n\n#european_countries_e{\n  polygon-fill: #FFFFB2;\n  polygon-opacity: 0.8;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 0.5;\n}\n#european_countries_e [ area <= 1638094] {\n   polygon-fill: #B10026;\n}\n#european_countries_e [ area <= 55010] {\n   polygon-fill: #E31A1C;\n}\n#european_countries_e [ area <= 34895] {\n   polygon-fill: #FC4E2A;\n}\n#european_countries_e [ area <= 12890] {\n   polygon-fill: #FD8D3C;\n}\n#european_countries_e [ area <= 10025] {\n   polygon-fill: #FEB24C;\n}\n#european_countries_e [ area <= 9150] {\n   polygon-fill: #FED976;\n}\n#european_countries_e [ area <= 5592] {\n   polygon-fill: #FFFFB2;\n}',
                cartocss_version: '2.1.1'
              }
            },
          ]
        },
        leafletInstance = {
          setLayer: () => {}
        },
        templatePromise,
        cartoMapsInstance = {
          urlTemplateQuery: () => templatePromise
        };

    beforeEach(function () {
      sandbox.stub(requires.leaflet, 'default').returns(leafletInstance);
      sandbox.stub(requires.cartoMaps, 'default').returns(cartoMapsInstance);

      templatePromise = new Promise((resolve, reject) => resolve('template'));
    })

    it('should call leaflet instance', function (done) {
      var mock = sandbox.mock(leafletInstance);
      mock.expects('setLayer').twice();

      map = new CartoDB(domElement, mapper, configWithLayers);

      templatePromise.then(() => {
        mock.verify();
        done();
      });
    })

    it('should call cartoMaps instance', function (done) {
      var mock = sandbox.mock(cartoMapsInstance);
      mock.expects('urlTemplateQuery').once().returns(templatePromise);;

      map = new CartoDB(domElement, mapper, configWithLayers);

      templatePromise.then(() => {
        mock.verify();
        done();
      });
    })
  });
});
