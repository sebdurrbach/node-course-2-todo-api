const {SHA256} = require('crypto-js');

let message = 'Hello world';
let hash = SHA256(message);

console.log(`Message : ${message}`);
console.log(`Hash : ${hash}`);

// Exemple de vérification par token

let data = { // data du user
  id: 4
};

let token = { // Token envoyé au client
  data, // ES6
  hash: SHA256(JSON.stringify(data) + 'secretsalt').toString()
  // Conversion de l'obj data en string
  // Ajout d'un salage à SHA256
  // Conversion du hash en string
};

// Vérification du token client
let resultHash = SHA256(JSON.stringify(token.data) + 'secretsalt').toString();
// Reconversion du data client en SHA256 + salt

// Comparaison avec le token envoyé
if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Donot trust!');
}
