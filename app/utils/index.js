'use strict';

var exports = module.exports = {};

var _ = require('underscore');

// Filter hidden (.) files and index.js
exports.filterOutHiddenAndIndex = function(fileList) {

  return _.filter(fileList, function filterPredicate(file) {
    
    var fileIsHidden = file.substr(0, 1) === '.';
    var fileIsIndex = file === 'index.js';
    var keepTheFile = !fileIsHidden && !fileIsIndex;

    return keepTheFile;

  });

};