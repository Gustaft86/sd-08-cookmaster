const recipeModel = require('../models/recipeModel');

const addRecipe = async (id, name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  const result = await recipeModel.addRecipe(id, name, ingredients, preparation);
  return { code: 201, result };
};

const getAllRecipes = async () => {
  const result = await recipeModel.getAllRecipes();
  return { code: 200, result };
};

const getRecipeById = async (id) => {
  const result = await recipeModel.getRecipeById(id);
  if (!result) {
    return { code: 404, message: 'recipe not found' };
  }
  return { code: 200, result };
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById
};
