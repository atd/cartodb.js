import CartoDB from '../../src/cartodb.js';

describe('CartoDB', () => {

  describe('constructor', () => {

    var domElement = '#map',
        provider = 'leaftlet',
        config =  {},
        map;

    describe('domElement argument', () => {

      describe('as string', () => {
        before(() => {
          map = new CartoDB(domElement, provider, config);
        });

        it('should have an object as domElement', () => {
          expect(map.domElement).to.be.an('object');
        });
      })

      describe('as object', () => {
        before(() => {
          map = new CartoDB({}, provider, config);
        });

        it('should have an object as domElement', () => {
          expect(map.domElement).to.be.an('object');
        });
      })
    });

    describe('provider argument', () => {
      describe('with known provider', () => {
        before(() => {
          map = new CartoDB(domElement, provider, config);
        });

        it('should have and object as provider', () => {
          expect(map.provider).to.be.a('function');
        });
      });
    });
  });
});
