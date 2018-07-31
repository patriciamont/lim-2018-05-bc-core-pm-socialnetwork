global.window = global;
global.assert = require('chai').assert;


const firebaseMock = require('firebase-mock')
global.firebase = firebaseMock.MockFirebaseSdk();

require('../src/js/app.js');
require('./app.spec.js');
