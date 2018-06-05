var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sebdurrbach:tousapoils911@ds247270.mlab.com:47270/node-todo-api-course' || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};