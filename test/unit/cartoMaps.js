import CartoMaps from '../../src/cartoMaps.js';

describe('CartoMaps', function () {
  var config = {
    user_name: 'documentation',
    maps_api_template: 'http://{user}.cartodb.com:80'
  },
  requestURL = 'http://documentation.cartodb.com:80/api/v1/map',
  layers = [
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
  ],
  apiResponse = {
    'layergroupid': '47aa0dd7b0083337a1c84ec772b922c1:0',
    'cdn_url': {
      'http': 'ashbu.cartocdn.com'
    }
  },
  apiTemplate = `http://${ apiResponse.cdn_url.http }/${ config.user_name }/api/v1/map/${ apiResponse.layergroupid }/1/{z}/{x}/{y}.png`,
  cartoMaps;

  beforeEach(function () {
    // TODO Should better useFakeXMLHttpRequest,
    // to decouple from jquery:
    // http://sinonjs.org/#fake-xmlhttprequest
    // But it needs to change test/setup/node.js to test in phantomJS
    // or other browser instead of using jsdom-global
    sandbox.stub($, 'post').callsFake(function(params) {
      params.success(apiResponse);
    })

    cartoMaps = new CartoMaps(config);
  });


  it('makes a GET request for CartoMaps API', function () {
    cartoMaps.urlTemplateQuery(layers);

    expect($.post).to.be.calledWithMatch({ url: requestURL});
  });

  it('returns the CartoMaps URI template', function (done) {
    cartoMaps.urlTemplateQuery(layers).then((template) => {
      expect(template).to.be.equal(apiTemplate);
      done();
    });
  });
});
