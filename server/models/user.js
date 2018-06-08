const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// toJSON est la méthode de mongoose qui renvoie le doc.
// On surcharge la méthode pour ne renvoyer que l'id et l'email
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject(); // Convertit le doc en obj js

  return _.pick(userObject, ['_id', 'email']);
}

// .methods associe une méthode à l'instance
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => { // Retourne la promesse avec le token
    return token;
  });
};

// .statics associe une méthode au model
UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject(); // équivalent
  }

  return User.findOne({ // On retourne la promesse pour chainer après l'appel à la méthode
    '_id': decoded._id,
    'tokens.token': token, // les quotes permettent une requête imbriquée
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
