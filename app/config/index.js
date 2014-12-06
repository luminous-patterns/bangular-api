'use strict';

var exports = module.exports = {};

// Determine the environment
var appEnvironment = 'NODE_ENV' in process.env ? process.env.NODE_ENV : 'local';

// Load the config file
exports.vars = require('./' + appEnvironment + '.json');