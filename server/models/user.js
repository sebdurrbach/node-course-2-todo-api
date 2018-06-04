var mongoose = require('mongoose');

var User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = {User};

// EXEMPLE

// var newUser = new User({
//   email: 'seb@mail.com'
// });

// newUser.save().then((doc) => {
//   console.log('Saved user', doc);
// }, (e) => {
//   console.log('Unable to save user', e);
// });