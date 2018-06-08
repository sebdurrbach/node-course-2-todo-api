const bcrypt = require('bcryptjs');

let password = 'abc123!';

bcrypt.genSalt(10, (err, salt) => { // génère le salage avec nombre de tours et le passe en callback
  bcrypt.hash(password, salt, (err, hash) => { // récupère le salage et passe le hash en callback
    console.log(hash);
  });
});

let hashedPassword = 'motdepassehashé';

bcrypt.compare(password, hashedPassword, (err, res) => { // Compare et renvoie bool en callback
  console.log(res);
});