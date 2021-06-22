const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /recipes', () => {
  describe('quando a receita é efetuado com sucesso', () => {
    const userData = { 
      name: 'Fake Name',
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };
    
    const userDataToToken = { 
      email: 'fakemail@gmail.com',
      password: 'senha123'
    };

    const payload = {
      "name": "Fake Food",
      "ingredients": "Fake ingredients",
      "preparation": "Put fake to the oven for 5 min"
  }

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
      
      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send(payload);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto de resposta possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });
  });
});

describe('GET /recipes', () => {
  describe('quando a solicitação é efetuado com sucesso', () => {
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
  }

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

      await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(recipeData);
      
      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .get('/recipes')
        .set('authorization', token)
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna uma array no body', () => {
      expect(response.body).to.be.an('array');
    });

    it('os itens são objetos', () => {
      const { body: [item] } = response;
      expect(item).to.be.a('object');
    });

    it('tais itens possuem as propriedades "_id", "userId", "name", "ingredients" e "preparation"', () => {
      const { body: [item] } = response;
      expect(item).to.include.all.keys('_id', 'userId', 'name', 'ingredients', 'preparation');
    });
  });
});

describe('GET /recipes/:id', () => {
  describe('quando a solicitação por ID é efetuado com sucesso', () => {
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
  }

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

      const { insertedId: ID_VALID } = await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(recipeData);
      
      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .get(`/recipes/${ID_VALID}`)
        .set('authorization', token)
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
  });
});

describe('PUT /recipes/:id', () => {
  describe('quando a atualização é efetuado com sucesso', () => {
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

    const payload = {
      "name": "UPDATE Fake Food",
      "ingredients": "UPDATE Fake ingredients",
      "preparation": "UPDATE Put fake to the oven for 5 min",
    }

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

      const { insertedId: ID_VALID } = await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(recipeData);
      
      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .put(`/recipes/${ID_VALID}`)
        .set('authorization', token)
        .send(payload);
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
  });
});

describe('DELETE /recipes/:id', () => {
  describe('quando a receita é deletada com sucesso', () => {
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
    let documents;
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

      const { insertedId: ID_VALID } = await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(recipeData);
      
      const { body: { token }} = await chai.request(server)
        .post('/login')
        .send(userDataToToken);

      response = await chai.request(server)
        .delete(`/recipes/${ID_VALID}`)
        .set('authorization', token)

      documents = await connectionMock.db('Cookmaster')
      .collection('recipes')
      .find()
      .toArray();
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 204', () => {
      expect(response).to.have.status(204);
    });

    it('a coleção "recipes" está vazia', () => {
      expect(documents).to.be.empty;
    });
  });
});

