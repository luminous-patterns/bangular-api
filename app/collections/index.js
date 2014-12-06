'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var fs = require('fs');
var utils = require('../utils');

// Load collections
exports.load = function() {

  var fileList = fs.readdirSync(__dirname);

  var collections = utils.filterOutHiddenAndIndex(fileList);

  _.each(collections, function requireModel(model) {
    require('./' + model);
  });

};