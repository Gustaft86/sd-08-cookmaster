const service = require('../service/recipeService');
const rescue = require('express-rescue');


const CREATED = 201;
const OK = 200;
const NOT_VALID = 400;
const NOT_FOUND = 404;
const Unauthorized = 401;
const NO_CONTENT = 204;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await service.createRecipe(name, ingredients, preparation, userId);
    
    res.status(CREATED).json(newRecipe);
  } catch (e) {
    return res.status(NOT_VALID).json({
      message: e.message,
    });
  }
};

const getAll = rescue(async (_req, res) => {
  const recipes = await service.getAll();
  res.status(OK).json(recipes);
});

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await service.getById(id);

    return res.status(OK).json(recipe);
  } catch (e) {
    return res.status(NOT_FOUND).json({
      message: e.message,
    });
  }
};

const updatedRecipes = async (req, res) => {
  const { id } = req.params;

  const { name, ingredients, preparation } = req.body;
  
  const update = await model.update(name, ingredients, preparation, id);

  res.status(OK).json(update);

};

const excludeRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const notRecipe = await service.exclude(id);
  return res.status(NO_CONTENT).json(notRecipe);
});



module.exports = {
  create,
  getAll,
  getRecipeById,
  // updatedRecipes,
  excludeRecipe,
};
