/*
 * Available mapping libraries
 *
 * Will probably support:
 * Leaflet, OpenLayers, Google Maps, d3.js, etc..
 */
const Mappers = [ 'leaflet' ];

class CartoDB {

  /**
   * Carto Maps API instance
   */
  get cartoMaps () {
    if (this._cartoMaps) {
      return this._cartoMaps;
    }

    this._cartoMapsClass = require('./cartoMaps').default;
    return this._cartoMaps = new this._cartoMapsClass(this.config.cartoMaps);
  }

  /**
   * Draws in map in domElement, using mapper mapping library and config
   *
   * @param {(string|Object)} domElement - a string denoting the CSS
   * or a DOM element object
   * @param {string} mapper - the name of the mapping library
   * @param {Object} config - the map configuration
   */
  constructor (domElement, mapper, config) {

    this._parseConfig(config);

    this.domElement = $(domElement);
    this._initMapper(mapper);
    this._setNextLayer();
  }

  /**
   * Sets some variables from the configuration file
   *
   * This function decouples the library from possible
   * changes in the configuration file syntax
   */
  _parseConfig(config) {
    this.config = {};

    this.config.cartoMaps = config.maps_api_config;

    this.config.mapper = {
      zoom: config.zoom
    }

    if (typeof config.center === 'string') {
      this.config.mapper.center = JSON.parse(config.center);
    } else {
      this.config.mapper.center = config.center;
    }

    this.config.layers = config.layers;
  }

  /**
   * Sets the mapping library for the new map, checking that the option
   * is included in the Mappers constant above
   */
  _initMapper(mapper) {

    if (Mappers.indexOf(mapper) < 0) {
      throw `Mapping library "${ mapper }" not supported`;
    } else {
      this.mapperClass = require(`./mappers/${ mapper }`).default;

      this.mapper = new this.mapperClass(this.domElement, this.config.mapper);
    }

  }

  /**
   * Sets the next layer described in the configuration
   * and it waits for it to be drawn to avoid order issues:
   * CartoDB layers need network requests, so they are asynchronous
   */
  _setNextLayer (index = 0) {

    let layerConfig = this.config.layers[index];

    if (layerConfig === undefined) {
      return;
    }

    switch (layerConfig.type) {
      case 'tiled':
        this.mapper.setLayer(layerConfig.options);

        this._setNextLayer(index + 1);
        break;
      case 'CartoDB':
        this.cartoMaps.urlTemplateQuery(this.config.layers).then((urlTemplate) => {
          this.mapper.setLayer({
            urlTemplate: urlTemplate
          })

          this._setNextLayer(index + 1);
        });
        break;
      default:
        throw `Unknown layer type ${ layerConfig.type }`;
    }
  }
};

// Use module.exports instead of ES6 exports default
// so library does not have de "default" property
module.exports = CartoDB;
