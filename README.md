# cartodb.js

Mini version of CartoDB.js

[![Travis build status](http://img.shields.io/travis/atd/cartodb.js.svg?style=flat)](https://travis-ci.org/atd/cartodb.js)
[![Code Climate](https://codeclimate.com/github/atd/cartodb.js/badges/gpa.svg)](https://codeclimate.com/github/atd/cartodb.js)
[![Test Coverage](https://codeclimate.com/github/atd/cartodb.js/badges/coverage.svg)](https://codeclimate.com/github/atd/cartodb.js)
[![Dependency Status](https://david-dm.org/atd/cartodb.js.svg)](https://david-dm.org/atd/cartodb.js)
[![devDependency Status](https://david-dm.org/atd/cartodb.js/dev-status.svg)](https://david-dm.org/atd/cartodb.js#info=devDependencies)


## Quick start

1. Add cartodb.js to your site:

```html
  <script src="http://...">
```

2. Create the map from the config file

```
  var map = new CartoDB('#map', 'leaflet', config);
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
