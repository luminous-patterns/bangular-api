'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var Q = require('q');
var db = require('../db');

var bookshelf = db.bookshelf;

// Base model
var Base = bookshelf.Model.extend({

  idAttribute: 'ID',

  patch: function(attrs) {
    if (!attrs) attrs = {};
    return this.save(attrs, {patch: true});
  },

  destroy: function() {
    throw new Error('model.destroy() is not valid, use model.del() instead');
  },

  del: function() {
    return this.patch({Deleted: new Date()});
  },

});

exports.model = bookshelf.model('Base', Base);