global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

// Turn node environment into a DOM environment
require('jsdom-global')()

require('babel-core/register');
require('./setup')();


