const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Remove : supprime les docs et renvoie un résultat, prend un obj vide pour tout supprimer
Todo.remove({}).then((result) => {
  console.log(result);
});

// FindOneAndRemove : supprime le premier doc correspondant et le renvoie
Todo.findOneAndRemove({_id: 123456}).then((todo) => {
  console.log(todo);
});

// FindByIdAndRemove : supprime le doc directement avec id et le renvoie
Todo.findByIdAndRemove('123456').then((todo) => {
  console.log(todo);
});