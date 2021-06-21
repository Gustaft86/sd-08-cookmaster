const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const  validateJWT = require('./auth/validateJWT');


const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userController.addUser);

app.post('/login', userController.loginUser);

app.post('/recipes', validateJWT, recipeController.addRecipe);
app.get('/recipes', recipeController.getAllRecipes);


module.exports = app;
