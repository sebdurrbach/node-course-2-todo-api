var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: [5, 'This text is too short'], // Possible perso message d'err avec array
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};

// EXEMPLE

// var newTodo = new Todo({ // Seuls les props required obligatoires
//   text: 'Feed the dog'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo', e);
// });