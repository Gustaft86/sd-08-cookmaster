const express = require('express');
const usersController = require('../controllers/users');

const app = express();
app.use(express.json());

app.get('/users', usersController.getUsers);
app.post('/users', usersController.createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
