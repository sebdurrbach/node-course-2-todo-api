// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // ES6 'destructuring' syntax

// var obj = new ObjectID(); // crée un nouvel id unique passable à l'insertion en db

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos')
  //   .find({_id: new ObjectID('5b106702f9df4c25182b17d1')}) // find renvoie un curseur pour les docs
  //   .toArray() // toArray renvoie promesse + array en absence de callback
  //   .then((docs) => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos')
  //   .find()
  //   .count() // renvoie une promesse + number en absence de callback
  //   .then((count) => {
  //     console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Seb'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users', err);
  });

  //client.close();
});