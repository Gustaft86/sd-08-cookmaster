const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('PUT /recipes/:id/image', () => {
  describe('quando ipload da imagem é efetuado com sucesso', () => {
    const userData = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };
    
    const userDataToToken = { 
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    const recipeData = {
      "name": "Fake Food",
      "ingredients": "Fake ingredients",
      "preparation": "Put fake to the oven for 5 min",
      "userId": "60d2070ff036586108c8d866"
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne(userData);

      const { insertedId: RECIPE_ID_VALID } = await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(recipeData);
      
      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .put(`/recipes/${RECIPE_ID_VALID}/image`)
        .set('authorization', token)
        .attach('image', './src/uploads/ratinho.jpg', 'ratinho.jpg');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('tal objeto possui as propriedades "_id", "userId", "name", "ingredients" e "preparation"', () => {
      expect(response.body).to.include.all.keys('_id', 'userId', 'name', 'ingredients', 'preparation');
    });

    it('tal objeto possui as propriedades "image"', () => {
      expect(response.body).to.have.property('image');
    });
  });
});

describe('GET /images/:id', () => {
  describe('quando ipload da imagem é efetuado com sucesso', () => {
    const userData = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    const userDataToToken = { 
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    const recipeData = {
      "name": "Fake Food",
      "ingredients": "Fake ingredients",
      "preparation": "Put fake to the oven for 5 min",
      "userId": "60d2070ff036586108c8d866"
    };

    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne(userData);

      const { insertedId: RECIPE_ID_VALID } = await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(recipeData);

      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      await chai.request(server)
        .put(`/recipes/${RECIPE_ID_VALID}/image`)
        .set('authorization', token)
        .attach('image', './src/uploads/ratinho.jpg', 'ratinho.jpg');

      response = await chai.request(server)
        .get(`/images/${RECIPE_ID_VALID}.jpeg`);

      console.log(response.path);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna uma imagem do tipo jpeg', () => {
      expect(response.type).to.be.equal('image/jpeg');
    });
  });
});
