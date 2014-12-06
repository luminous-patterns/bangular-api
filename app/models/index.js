'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var fs = require('fs');
var utils = require('../utils');

// Load models
exports.load = function() {

  var fileList = fs.readdirSync(__dirname);

  var models = utils.filterOutHiddenAndIndex(fileList);

  _.each(models, function requireModel(model) {
    require('./' + model);
  });

};