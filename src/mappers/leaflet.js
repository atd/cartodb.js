const StylesheetTag = '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"'
  + ' integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="'
  + ' crossorigin=""/>';

const ScriptTag = '<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"'
  + ' integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log=="'
  + ' crossorigin=""></script>';

/**
 * Class supporting [Leaflet]{@link http://leafletjs.com/} mapping library
 */
class Leaflet {

  /**
   * Creates a map in domElement with map options
   * @param {Object} domElement - jQuery object of the DOM element
   * that will contain the map
   * @param {Object} options - the map options for the map
   * @param {Array} options.center - Initial geographic center of the map
   * @param {Number} options.zoom - Initial map zoom level
   */
  constructor(domElement, options) {
    // Qeues layers until the map is properly initialized
    this._layerQueue = [];

    this._addDocumentTags().then(() => {
      this._initMap(domElement, options);
      this._processLayerQueue();
    });

  }

  /**
   * Sets a map layer
   * @param {Object} options - layer options
   */
  setLayer(options) {
    if (this._isReady()) {
      return this._drawLayer(options);
    } else {
      this._layerQueue.push(options);
    }
  }

  /*
   * Add Leaflet css and js to the document
   *
   * FIXME jquery append should be synchronous
   * but L is not defined after the script is added.
   * This function returns a promise that resolves
   * when the L element is defined
   *
   * Should investigate further on why L is not synchronously defined
   */
  _addDocumentTags () {

    $('head')
    .append(StylesheetTag)
    .append(ScriptTag);

    return new Promise((resolve, reject) => {
      var timer = setInterval(() => {
        if (this._isReady()) {
          clearInterval(timer);
          resolve();
        }
      }, 10);
    })
  }

  /**
   * Is the map library initialized?
   */
  _isReady () {
    return typeof L === 'object';
  }

  _initMap (jqueryElement, options) {
    this.map = L.map(jqueryElement[0], options);

  }

  _drawLayer (options) {
    let urlTemplate = options.urlTemplate;
    delete options.urlTemplate;
    let layer = L.tileLayer(urlTemplate, options);

    layer.addTo(this.map);

    return layer;

  }

  _processLayerQueue () {
    for (let options of this._layerQueue) {
      this._drawLayer(options);
    }
  }

}

export default Leaflet;
