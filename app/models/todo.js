'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var db = require('../db');
var Base = require('./base.js');

var bookshelf = db.bookshelf;

// Todo model
var Todo = Base.model.extend({
  tableName: 'Todos',
});

exports.model = bookshelf.model('Todo', Todo);