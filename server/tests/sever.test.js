const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
});

// Si on veut tester avec une db vide :
// beforeEach((done) => { // Avant chaque test suivant
//   Todo.remove({}).then(() => done()); // on vide la db
// });

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text'; // valeur de test en Post via Todo dans App

    request(app) // Test de l'app
      .post('/todos') // avec la méthode Post
      .send({text}) // avec la valeur test
      .expect(200) // Test du statut retourné
      .expect((res) => {
        expect(res.body.text).toBe(text); // relatif à res.send(doc) de app
      })
      .end((err, res) => { // si erreur du test
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => { // fetch de la db pour text
          expect(todos.length).toBe(1); // test doc en db = 1
          expect(todos[0].text).toBe(text); // test text = valeur test
          done();
        }).catch((e) => done(e)); // si promesse fail
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({}) // Obj vide pour créer 400
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); // Nombre de docs entrés en beforeEach
          done();
        }).catch((e) => done(e));
      });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});