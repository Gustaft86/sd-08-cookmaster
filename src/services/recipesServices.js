const recipesModel = require('../models/recipesModel');
const { ObjectId } = require('mongodb');
const { code, message } = require('../helpers/messages');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if(!name || !ingredients || !preparation) {
    throw new Error({ 'message': message.INVALID_ENTRIES });
  };
  const newRecipe = await recipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error(message.NOT_FOUND);
  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) throw new Error(message.NOT_FOUND);
  return recipe;
};

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) throw new Error(message.NOT_FOUND);
  const newRecipe = await recipesModel.updateRecipe({ 
    id,
    name,
    ingredients,
    preparation,
    userId,
  });

  return newRecipe;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error(message.NOT_FOUND);
  const deleteRecipe = await recipesModel.deleteRecipe(id);
  return deleteRecipe;
};

const uploadImages = async (id, path) => {
  if (!ObjectId.isValid(id)) throw new Error(message.NOT_FOUND);
  await recipesModel.uploadImage(id, { image: path });
  const recipe = await recipesModel.getRecipeById(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImages,
};