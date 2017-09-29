# cartodb.js

Mini version of CartoDB.js

[![Travis build status](http://img.shields.io/travis/atd/cartodb.js.svg?style=flat)](https://travis-ci.org/atd/cartodb.js)
[![Dependency Status](https://david-dm.org/atd/cartodb.js.svg)](https://david-dm.org/atd/cartodb.js)
[![devDependency Status](https://david-dm.org/atd/cartodb.js/dev-status.svg)](https://david-dm.org/atd/cartodb.js#info=devDependencies)


## Quick start

1. Add jquery and cartodb.js to your site:

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/atd-cartodb.js/dist/cartodb.js"></script>
```

2. Add the html element for the map and the config file

```html
<div id="map" style="height: 400px"></div>

<script type="text/javascript">
  var config = {
    "center":"[52.5897007687178, 52.734375]",
    "zoom":4,
    "maps_api_config": {
      "user_name": "documentation",
      "maps_api_template": "http://{user}.cartodb.com:80"
    },
    "layers":[
      {
        "type":"tiled",
        "options":{     "urlTemplate":"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          "minZoom":"0",
          "maxZoom":"18",
          "attribution":"&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }
      },
      {
        "type":"CartoDB",
        "options":{
          "sql":"select * from european_countries_e",
          "cartocss":"/** choropleth visualization */\n\n#european_countries_e{\n  polygon-fill: #FFFFB2;\n  polygon-opacity: 0.8;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 0.5;\n}\n#european_countries_e [ area <= 1638094] {\n   polygon-fill: #B10026;\n}\n#european_countries_e [ area <= 55010] {\n   polygon-fill: #E31A1C;\n}\n#european_countries_e [ area <= 34895] {\n   polygon-fill: #FC4E2A;\n}\n#european_countries_e [ area <= 12890] {\n   polygon-fill: #FD8D3C;\n}\n#european_countries_e [ area <= 10025] {\n   polygon-fill: #FEB24C;\n}\n#european_countries_e [ area <= 9150] {\n   polygon-fill: #FED976;\n}\n#european_countries_e [ area <= 5592] {\n   polygon-fill: #FFFFB2;\n}",
          "cartocss_version":"2.1.1"
        }
      },
      {
        "options": {
          "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
          "minZoom": "0",
          "maxZoom": "18",
          "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        },
        "type": "tiled"
      }
    ],
  }
</script>
```

2. Create the map from the config file

```html
<script type="text/javascript">
  var map = new CartoDB('#map', 'leaflet', config);
</script>
```


## Development

Use [yarn](https://yarnpkg.com/) to install node packages

```
yarn
```

Use `gulp watch` for development. It will run unit tests, rebuild the library and
launch a web server for accesing the example html pages.

TODO: html page live reload

### Testing

Run unit and acceptance tests with `gulp`

Alternatively, you can run either suite with `gulp test-unit` or `gulp test-acceptance`
