'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var config = require('../config').vars;

var knexConfig = {
  client: 'mysql',
  connection: {
    host        : config.mysql.host,
    user        : config.mysql.user,
    password    : config.mysql.pass,
    database    : config.mysql.dbName,
    charset     : 'utf8',
    debug       : config.mysql.debug
  },
  pool: {
    afterCreate: function(connection, callback) {
      
      // Set the MySQL time_zone to UTC
      connection.query('SET time_zone = "+00:00";', function(err) {
        callback(err, connection);
      });

    }
  }
};

var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

// Use the registry plugin for bookshelf to fix circular dependency issues
bookshelf.plugin('registry');

exports.bookshelf = bookshelf;
exports.knex = knex;