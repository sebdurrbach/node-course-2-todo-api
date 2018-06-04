const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => { // Avant chaque test suivant
  Todo.remove({}).then(() => done()); // on vide la db
});

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
        Todo.find().then((todos) => { // fetch de la db
          expect(todos.length).toBe(1); // si doc en db = 1
          expect(todos[0].text).toBe(text); // si text = valeur test
          done();
        }).catch((e) => done(e)); // si promesse fail
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      })
  })
});