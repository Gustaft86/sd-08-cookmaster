const express = require('express');
const users = require('../controllers/Users');
const recipes = require('../controllers/Recipes');
const validateToken = require('../middleware/validateToken');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/users', users.createUser);

app.post('/login', users.login);

app.post('/recipes', validateToken, recipes.createRecipe);

app.get('/recipes/:id?', recipes.searchRecipes);

app.put('/recipes/:id', validateToken, recipes.updateRecipe);

app.delete('/recipes/:id', validateToken, recipes.deleteRecipe);

module.exports = app;
