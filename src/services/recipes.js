const Recipes = require('../models/recipes');
// const Users = require('../models/users');

const zeroRecipes = 0;

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await Recipes.create(name, ingredients, preparation, userId);
  return newRecipe;
};

const getAll = async () => {
  const allRecipes = await Recipes.getAll();

  if (allRecipes.length === zeroRecipes) {
    return null;
  }
  return allRecipes;
};

const getById = async (id) => {
  const recipeID = await Recipes.getById(id);

  return recipeID;
};

const update = async (id, fields, userId) => {
  // const recipe = await Recipes.getById(id);
  // console.log('recipe', recipe.userId);
  // const user = await Users.getById(recipe.userId);
  // console.log('user', user.role, user._id);
  
  // if (user.role !== 'admin' && user._id !== recipe.userId) return null;

  const upRecipe = await Recipes.update(id, fields, userId);
  
  // if (!upRecipe) return null;
  return upRecipe;
};

const exclude = async (id) => {
  const recipeID = await Recipes.getById(id);

  await Recipes.exclude(id);

  return recipeID;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude
};