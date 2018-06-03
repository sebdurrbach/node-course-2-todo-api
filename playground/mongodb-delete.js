// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // ES6 'destructuring' syntax

// var obj = new ObjectID(); // crée un nouvel id unique passable à l'insertion en db

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // deleteMany -> supprime plusieurs docs et retourne un obj result

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne -> supprime un doc et retourne un obj result

  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete -> supprime le doc recherché et le retourne dans un obj

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Seb'});

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b1455b6cff4ad0df617ccfb')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  //client.close();
});