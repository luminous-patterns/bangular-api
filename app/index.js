'use strict';

var colors = require('colors');
var config = require('./config').vars;
var models = require('./models');
var webService = require('./server');
var collections = require('./collections');

// Load models & collections
models.load();
collections.load();

var date = new Date();
var webServiceURL = 'http://' + config.webService.host + ':' + config.webService.port;
var welcomeMessage = '\n\n'
  + '<><><><><><><><><><><><><><><><><><><><><><>\n'.bold.green
  + '\n'
  + '  Bangular REST Web Service\n'.bold.green
  + '  -------------------------\n'.bold.green
  + '\n'
  + '  URL:\n'.bold.yellow
  + '  ' + webServiceURL.grey + '\n\n'
  + '  MySQL server:\n'.bold.yellow
  + '  ' + config.mysql.host.grey + '\n\n'
  + '  Started:\n'.bold.yellow
  + '  ' + date.toString().grey + '\n'
  + '\n'
  + '<><><><><><><><><><><><><><><><><><><><><><>\n\n'.bold.green;

console.log(welcomeMessage);

// Start the web service
webService.start();