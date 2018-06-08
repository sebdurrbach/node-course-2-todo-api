const {User} = require('./../models/user');

let authenticate = (req, res, next) => { // Middleware pour les routes
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); // Envoie vers le catch au lieu de réécrire le même code 2 fois
    }

    req.user = user;
    req.token = token;
    next(); // Passe à la suite du code des routes (obligatoire)
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};