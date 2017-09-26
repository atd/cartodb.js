const providers = [ 'leaftlet' ];

class CartoDB {

  constructor (domElement, provider, config) {

    switch (typeof domElement) {
      case 'object':
        this.domElement = domElement;

        break;
      case 'string':
        this.domElement = $(domElement);

        break;
      default:
        throw `Invalid DOM element passed to CartoDB: ${ domElement }`;
    }

    if (providers.indexOf(provider) < 0) {
      throw `Provider ${ provider } not supported`;
    } else {
      this.provider = require(`./providers/${ provider }`).default;
    }

    this.config = config;

  }


};

export default CartoDB;
