'use strict';

var _ = require('underscore');
var Q = require('q');
var db = require('../db');
var utils = require('../utils');
var config = require('../config').vars;
var routes = require('./routes.json');
var restify = require('restify');

var webService = null;
var controllers = loadControllers(routes);

// Start the web service
exports.start = function() {

  webService = createWebService();
  
  bindEvents(webService);
  setupRoutes(webService, routes, controllers);

  var listenOnAllHosts = config.webService.host === '*';

  if (listenOnAllHosts) {
    webService.listen(config.webService.port, onListenComplete);
  }
  else {
    webService.listen(
      config.webService.port, 
      config.webService.host, 
      onListenComplete
    );
  }

};

// Create Restify web service
function createWebService() {

  var webService = restify.createServer({
    name          : "bangular-api",
    formatters    : getFormatters()
  });

  var bodyParserOpts = {
    mapParams: true
  };

  webService.use([
    restify.queryParser(),
    restify.bodyParser(bodyParserOpts),
    restify.CORS(config.webService.cors),
    restify.acceptParser(webService.acceptable)
  ]);

  return webService;

}

// Get response formatters
function getFormatters() {

  return {

    'application/json': function formatJSON(req, res, body) {

      if (body instanceof Error) {
        
        res.statusCode = 500;
        
        return JSON.stringify({
          Error: body.message
        });

      }
      else {
        return JSON.stringify(body);
      }

    }

  };

}

// Restify event bindings
function bindEvents(webService) {

  // When the end point does not exist
  webService.on('NotFound', onRouteNotFound);

  // When the method is not allowed
  webService.on('MethodNotAllowed', onMethodNotAllowed);

  // When there is an uncaught exception
  webService.on('uncaughtException', onUncaughtException);

  // After every response
  webService.on('after', onAfterResponse);

}

// Setup routes
function setupRoutes(webService, routes, controllers) {

  var count = 0;

  _.each(routes, function(route) {

    var method = route[0];
    var path = route[1];
    var controller = controllers[route[2]];
    var func = route[3];

    var callback = function(req, res, next) {
      
      res.setHeader('Access-Control-Allow-Origin', '*');

      try {

        return controller[func](req, res, next)
          .catch(function(err) {
            res.send(500, err);
            return next();
          })
          .done();

      }
      catch (err) {
        res.send(500, err);
        return next();
      }

    };

    switch (method) {

      case 'GET':
        webService.get(path, callback);
        break;

      case 'POST':
        webService.post(path, callback);
        break;

      case 'PUT':
        webService.put(path, callback);
        break;

      case 'DELETE':
        webService.del(path, callback);
        break;

      default:
        // Do nothing & skip count
        return;

    }

    count++;

  });

  console.log('Web service found ' + count + ' valid routes');

  return webService;

}

function loadControllers(routes) {
  
  var controllers = {};
  var controllerNames = getControllerNames(routes);
  
  for (var i = 0; i < controllerNames.length; i++) {
    controllers[controllerNames[i]] = require('./controllers/' + controllerNames[i]);
  }
  
  return controllers;

}

function getControllerNames(routes) {
  return _.uniq(_.pluck(routes, 2));
}

function onListenComplete() {
  console.log('Web service listening at ' + webService.url);
}

function onRouteNotFound(req, res, route, err) {
  return res.send(new Error(
    'Resource not found'
  ));
}

function onMethodNotAllowed(req, res) {

  var requestMethodIsOptions = req.method.toLowerCase() === 'options';

  if (!requestMethodIsOptions) {
    return res.send(new Error(
      'Method not allowed'
    ));
  }
    
  var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type'];

  if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
  res.header('Access-Control-Allow-Methods', res.methods.join(', '));
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  return res.send(204);

}

function onUncaughtException(req, res, route, err) {
  console.log('Uncaught error: ', err.stack);
}

function onAfterResponse(req, res, route, err) {

  var currentDate = new Date();

  var log = {
    "Method"             :  req.method,
    "URL"                :  req.url,
    "UserAgent"          :  req.headers['user-agent'],
    "RequestHeaders"     :  req.headers,
    "RequestBody"        :  req.params,
    "ResponseCode"       :  res.statusCode,
    "Duration"           :  currentDate - req.time(),
    "Date"               :  currentDate
  };

  console.log(JSON.stringify(log));

}