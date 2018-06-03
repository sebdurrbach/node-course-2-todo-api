// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // ES6 'destructuring' syntax

// var obj = new ObjectID(); // crée un nouvel id unique passable à l'insertion en db

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b1452fccff4ad0df617cbfa')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result, undefined, 2);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b143bb8cff4ad0df617c584')
  }, {
    $set: {
      name: 'Seb',
      location: 'Paris'
    },
    $inc: {
      age: 2
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })

  //client.close();
});