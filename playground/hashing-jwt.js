const jwt = require('jsonwebtoken');

let data = {
  id: 10
};

// Hash + Salt
let token = jwt.sign(data, '123abc');
console.log(token);

// Vérification avec salage
let decoded = jwt.verify(token, '123abc');
// Revoie la partie payload du token : data + iat (issued at timestamp)
console.log('Decoded : ', decoded);