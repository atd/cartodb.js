/**
 * Carto Maps API wrapper
 */
class CartoMaps {

  constructor (config) {
    this.config = config;

    this._requestURL = config.maps_api_template.replace('{user}', config.user_name);

    this._requestURL += '/api/v1/map';
  }

  /**
   * Queries CartoMaps API for the urlTemplate of the layer described
   * in layers
   * @param {Array} layers - the layers for this map
   * @return {Promise} a promise that is resolved with the urlTemplate
   * of the CartoDB layer
   */
  urlTemplateQuery (layers) {
    return new Promise((resolve, reject) => {
      $.post({
        url: this._requestURL,
        data: this._buildMapConfig(layers),
        success: (data) => {
          resolve(this._generateUrlTemplate(data));
        },
        contentType: 'application/json'
      });
    });
  }

  /**
   * Builds the [MapConfig]{@link https://carto.com/docs/carto-engine/maps-api/mapconfig/}
   * payload for the Carto Maps API request
   */
  _buildMapConfig (layers) {
    var requestLayers = [];

    for (let layer of layers) {
      switch (layer.type) {
        case 'tiled':
          requestLayers.push({
            type: 'http',
            options: {
              urlTemplate: layer.options.urlTemplate
            }
          })
          break;
        case 'CartoDB':
          layer.options.interactivity = [ "cartodb_id" ];

          requestLayers.push({
            type: 'mapnik',
            options: layer.options
          });
          break;
        default:
          throw `Unknown layer type: ${ layer.type }`;
      }
    }

    return JSON.stringify({ layers: requestLayers });
  }

  _generateUrlTemplate(response) {
    return `http://${ response.cdn_url.http }/${ this.config.user_name }/api/v1/map/${ response.layergroupid }/1/{z}/{x}/{y}.png`;
  }
}

export default CartoMaps;
