'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var db = require('../db');

var bookshelf = db.bookshelf;

// Base collection
var Base = bookshelf.Collection.extend({});

exports.collection = bookshelf.collection('Base', Base);