'use strict';

var exports = module.exports = {};

var _ = require('underscore');
var bookshelf = require('../../db').bookshelf;

// Properties of a todo that can be updated via the API
var editableProps = [
  'Summary',
  'Details'
];

// POST /todos
module.exports.create = function(req, res, next) {

  var ID = req.params.ID;
  var props = _.pick(req.params, editableProps);

  var todoModel = bookshelf.model('Todo');
  var todo = todoModel.forge(props);

  if (!props.Summary) {
    throw new Error('A summary must be provided');
  }

  return todo
    .save()
    .then(function(todo) {
      res.send(200, todo.toJSON());
      return next();
    });

};

// GET /todos
module.exports.getMultiple = function(req, res, next) {

  var todoCollection = bookshelf.collection('Todos');
  var todos = todoCollection.forge();

  var dbQuery = {
    whereNull: [
      'Deleted'
    ],
    orderByRaw: 'Created ASC'
  };

  return todos
    .query(dbQuery)
    .fetch()
    .then(function() {
      res.send(200, todos.toJSON());
      return next();
    });

};

// GET /todos/:ID
module.exports.getSingle = function(req, res, next) {

  var ID = req.params.ID;

  return fetchTodo(ID)
    .then(function(todo) {
      res.send(200, todo.toJSON());
      return next();
    });

};

// PATCH /todos/:ID
module.exports.patch = function(req, res, next) {

  var ID = req.params.ID;
  var props = _.pick(req.params, editableProps);

  return fetchTodo(ID)
    .then(function(todo) {
      return todo.patch(props);
    })
    .then(function(todo) {
      res.send(200, todo.toJSON());
      return next();
    });

};

// DELETE /todos/:ID
module.exports.delete = function(req, res, next) {

  var ID = req.params.ID;

  return fetchTodo(ID)
    .then(function(todo) {
      return todo.del();
    })
    .then(function() {
      res.send(204, '');
      return next();
    });

};

// Get a todo by ID
function fetchTodo(ID) {

  var todoModel = bookshelf.model('Todo');
  var todo = todoModel.forge({ID: ID});

  return todo
    .fetch()
    .then(function(todo) {

      var todoExists = !!todo && !todo.get('Deleted');

      if (!todoExists) {
        throw new Error('Todo #' + ID + ' does not exist');
      }

      return todo;

    });

}