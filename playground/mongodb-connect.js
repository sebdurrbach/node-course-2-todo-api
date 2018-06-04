// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // ES6 'destructuring' syntax

// var obj = new ObjectID(); // crée un nouvel id unique passable à l'insertion en db

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    //_id = 123,
    name: 'Seb',
    age: 36,
    location: 'Paris'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert users', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp()); // decode la valeur de _id en timestamp
  });

  client.close();
});