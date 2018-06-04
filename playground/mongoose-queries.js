const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b15ac67a8387d0cb8a518f0'; // Id à prendre en db

if (!ObjectID.isValid(id)) {
  console.log('Id is not valid');
}

Todo.find({ // Toutes les occurences, return array
  _id: id // Pas besoin de ObjectID avec mongoose
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({ // La première occurrence, return obj
  _id:id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id).then((todo) => { // Fetch par l'id, return obj
  if (!todo) return console.log('Id not found'); // Si id n'existe pas
  console.log('Todo by id', todo);
}).catch((e) => console.log(e)); // Si format id est invalide (!ObjectID)

User.findById('5b154b3c3f916f1b3cbe4f66').then((user) => {
  if (!user) console.log('Unable to find user');
  else console.log(JSON.stringify(user, undefined, 2));
}, (e) => console.log(e));