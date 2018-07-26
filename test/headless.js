global.window = global;
global.assert = require('chai').assert;

require('../src/js/app');
require('./data.spec.js');
