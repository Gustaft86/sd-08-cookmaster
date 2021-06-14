const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;
let response;
let token;

describe('Test Init', () => {
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  describe('POST /users', () => {
    describe('1.1 - When registration fails due to an invalid entry', () => {
      describe('1.1.1 - When name field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/users')
            .send({name: '', email: 'remy@ratatouille.com', password: '123456'});
        });

        it('returns status code "400"', () => {
          expect(response).to.have.status(400);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Invalid entries. Try again."', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.')
        });
      });

      describe('1.1.2 - When email field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/users')
            .send({name: 'Remy', email: '', password: '123456'});
        });

        it('returns status code "400"', () => {
          expect(response).to.have.status(400);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Invalid entries. Try again."', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.')
        });
      });

      describe('1.1.3 - When password field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/users')
            .send({name: 'Remy', email: 'remy@ratatouille.com', password: ''});
        });

        it('returns status code "400"', () => {
          expect(response).to.have.status(400);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Invalid entries. Try again."', () => {
          expect(response.body.message).to.be.equal('Invalid entries. Try again.')
        });
      });
    });
      
    describe('1.2 - When the user registration is successful', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({name: 'Remy', email: 'remy@ratatouille.com', password: '123456'});
      });

      it('returns status code "201"', () => {
        expect(response).to.have.status(201);
      });

      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "user"', () => {
        expect(response.body).to.have.property('user');
      });

      it(`the "user" property has the user's registration data as its value`, async () => {
        expect(response.body.user).to.be
          .deep.equals({
            name: 'Remy',
            email: 'remy@ratatouille.com',
            role: 'user',
            _id:`${response.body.user._id}`,
          });
      });
    });

    describe('1.3 - When a registration fails due to duplicity', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({name: 'Remy Clone', email: 'remy@ratatouille.com', password: '654321'});
      });

      it('returns status code "409"', () => {
        expect(response).to.have.status(409);
      });

      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('the "message" property has the value: "Email already registered"', () => {
        expect(response.body.message).to.be.equal('Email already registered')
      });
    });  
  });

  describe('POST /login', () => {
    describe('2.1 - When registration fails due to an invalid entry', () => {
      describe('2.1.1 - When email field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: '', password: '123456' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "All fields must be filled"', () => {
          expect(response.body.message).to.be.equal('All fields must be filled')
        });
      });

      describe('2.1.2 - When password field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: 'remy@ratatouille.com', password: '' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "All fields must be filled"', () => {
          expect(response.body.message).to.be.equal('All fields must be filled')
        });
      });

      describe('2.1.3 - When password field is wrong', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: 'remy@ratatouille.com', password: '12345' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Incorrect username or password"', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password')
        });
      });

      describe('2.1.4 - When email field is wrong', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send({ email: 'remyy@ratatouille.com', password: '123456' });
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
    
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });

        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });

        it('the "message" property has the value: "Incorrect username or password"', () => {
          expect(response.body.message).to.be.equal('Incorrect username or password')
        });
      });
    });
      
    describe('2.2 - When the login is successful', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({ email: 'remy@ratatouille.com', password: '123456'});
      });

      it('returns status code "200"', () => {
        expect(response).to.have.status(200);
      });

      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "token"', () => {
        expect(response.body).to.have.property('token');
      });

      it(`the "token" property has an encrypted string`, async () => {
        expect(typeof (response.body.token)).to.be.equals('string');
      });
    });
  });
  
  describe('POST /recipes', () => {
    before(async () => {
      const login = await chai.request(server)
        .post('/login')
        .send({ email: 'remy@ratatouille.com', password: '123456' });
      token = await login.body.token;
    });
    describe('3.1 - When registration fails due to an invalid entry', () => {
      describe('3.1.1 - When name field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/recipes')
            .set('authorization', token)
            .send({ name: '', ingredients: 'water', preparation: 'freeze the water'});
        });

        it('returns status code "400"', () => {
          expect(response).to.have.status(400);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });
  
        it(`the "message" property has the value: "Invalid entries. Try again."`, async () => {
          expect(response.body.message).to.be.equals('Invalid entries. Try again.');
        });
      });

      describe('3.1.2 - When ingredients field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/recipes')
            .set('authorization', token)
            .send({ name: 'ice', ingredients: '', preparation: 'freeze the water'});
        });

        it('returns status code "400"', () => {
          expect(response).to.have.status(400);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });
  
        it(`the "message" property has the value: "Invalid entries. Try again."`, async () => {
          expect(response.body.message).to.be.equals('Invalid entries. Try again.');
        });
      });

      describe('3.1.3 - When preparation field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/recipes')
            .set('authorization', token)
            .send({ name: 'ice', ingredients: 'water', preparation: ''});
        });

        it('returns status code "400"', () => {
          expect(response).to.have.status(400);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });
  
        it(`the "message" property has the value: "Invalid entries. Try again."`, async () => {
          expect(response.body.message).to.be.equals('Invalid entries. Try again.');
        });
      });
    });

    describe('3.2 - When registration fails due to an invalid token', () => {
      describe('3.2.1 - When token field is empty', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/recipes')
            .set('authorization', '')
            .send({ name: 'ice', ingredients: 'water', preparation: 'freeze the water'});
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });
  
        it(`the "message" property has the value: "jwt malformed"`, async () => {
          expect(response.body.message).to.be.equals('jwt malformed');
        });
      });

      describe('3.2.2 - When token field is invalid', () => {
        before(async () => {
          response = await chai.request(server)
            .post('/recipes')
            .set('authorization', 'Invalid_token')
            .send({ name: 'ice', ingredients: 'water', preparation: 'freeze the water'});
        });

        it('returns status code "401"', () => {
          expect(response).to.have.status(401);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });
  
        it(`the "message" property has the value: "jwt malformed"`, async () => {
          expect(response.body.message).to.be.equals('jwt malformed');
        });
      });
    });

    describe('3.3 - When the recipe registration is successful', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/recipes')
          .set('authorization', token)
          .send({ name: 'ice', ingredients: 'water', preparation: 'freeze the water'});
      });

      it('returns status code "201"', () => {
        expect(response).to.have.status(201);
      });

      it('returns an object in the body', () => {
        expect(response.body).to.be.an('object');
      });

      it('the response object has the property "recipe"', () => {
        expect(response.body).to.have.property('recipe');
      });

      it(`the "recipe" property has the recipe's registration data as its value`, async () => {
        expect(response.body.recipe).to.be.deep.equals({
          _id: `${response.body.recipe._id}`,
          ingredients: "water",
          name: "ice",
          preparation: "freeze the water",
          userId: `${response.body.recipe.userId}`,
        });
      });
    });
  });

  describe('GET /recipes', () => {
    describe('4 - When the list of recipes is requested', async () => {
      before(async () => {
        response = await chai.request(server)
          .get('/recipes');
      });

      it('returns status code "200"', () => {
        expect(response).to.have.status(200);
      });

      it('returns an array in the body', () => {
        expect(response.body).to.be.an('array');
      });

      it('the response array is a list of recipe objects', () => {
        expect(response.body).to.be.deep.equals([
          {
            _id: `${response.body[0]._id}`,
            ingredients: "water",
            name: "ice",
            preparation: "freeze the water",
            userId: `${response.body[0].userId}`,
          }
        ]);
      });
    });
  });

  describe('GET /recipes/:id', () => {
    describe('4 - When a recipe is requested by id', () => {
      describe('4.1 - When id is invalid', async () => {
        before(async () => {
          response = await chai.request(server)
            .get('/recipes/invalid_id');
        });
  
        it('returns status code "404"', () => {
          expect(response).to.have.status(404);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it('the response object has the property "message"', () => {
          expect(response.body).to.have.property('message');
        });
  
        it(`the "message" property has the value: "recipe not found"`, async () => {
          expect(response.body.message).to.be.equals('recipe not found');
        });
      });

      describe('4.2 - When id is valid', async () => {
        before(async () => {
          const newRecipe = await chai.request(server)
          .post('/recipes')
          .set('authorization', token)
          .send({ name: 'ice', ingredients: 'water', preparation: 'freeze the water'});

          const validId = newRecipe.body.recipe._id;
        
          response = await chai.request(server)
            .get(`/recipes/${validId}`);
        });
  
        it('returns status code "200"', () => {
          expect(response).to.have.status(200);
        });
  
        it('returns an object in the body', () => {
          expect(response.body).to.be.an('object');
        });
  
        it("the response object contains the recipe's data", () => {
          expect(response.body).to.be.deep.equals({
              _id: `${response.body._id}`,
              ingredients: "water",
              name: "ice",
              preparation: "freeze the water",
              userId: `${response.body.userId}`,
            });
        });
      });
    });
  });
});
