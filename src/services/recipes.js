const { ObjectId } = require('mongodb');
const RecipeModel = require('../models/Recipe');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new Error('Invalid entries. Try again.');
  }
  return undefined;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const invalidEntries = validateRecipe(name, ingredients, preparation);
  if (invalidEntries) {
    throw new Error(invalidEntries);
  }
  return RecipeModel.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => {
  const recipes = await RecipeModel.getAllRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  
  const recipe = await RecipeModel.getRecipeById(id);
  
  if (!recipe) throw new Error('recipe not found');
  
  return recipe;
};

const updateRecipe = async (id, { name, ingredients, preparation, userId }) => {
  const invalidEntries = validateRecipe(name, ingredients, preparation);
  if (invalidEntries) {
    throw new Error(invalidEntries);
  }

  return RecipeModel.updateRecipe(id, { name, ingredients, preparation, userId });
};

const deleteRecipe = async (id) => {
  const recipeToDelete = await RecipeModel.deleteRecipe(id);

  return recipeToDelete;
};

const uploadImage = async (id, image) => {
  return await RecipeModel.uploadImage(id, image);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage
};
