'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var db = require('../db');
var Base = require('./base.js');

var bookshelf = db.bookshelf;

// Todo collection
var Todos = Base.collection.extend({
  model: bookshelf.model('Todo'),
});

exports.collection = bookshelf.collection('Todos', Todos);