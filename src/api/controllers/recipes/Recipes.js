const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Recipe = require('../../services/recipes/Recipes');
const { ERRORS, STATUS_201, STATUS_200, STATUS_204, KEY } = require('../../utils/consts');

const create = rescue(async (req, res) => {
  const { e500 } = ERRORS;
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  try {
    const decode = jwt.verify(authorization, KEY);
    const { data } = decode;
    const userId = data._id;
    const newRecipe = await Recipe.create(name, ingredients, preparation, userId);
    return res.status(STATUS_201).json({ recipe: newRecipe });
  } catch (err) {
    return res.status(e500.status).json({ message: e500.message });
  }
});

const getAll = rescue(async (_req, res) => {
  const recipesList = await Recipe.getAll();
  return res.status(STATUS_200).json(recipesList);
});

const getRecipeById = rescue(async (req, res) => {
  const { eNotFound } = ERRORS;
  const { id } = req.params;

  const recipe = await Recipe.getRecipeById(id);

  if (!recipe) {
    return res.status(eNotFound.status).json({ message: eNotFound.message });
  }
  return res.status(STATUS_200).json(recipe);
});

const update = rescue(async (req, res) => {
  const { e500 } = ERRORS;
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    const decode = jwt.verify(authorization, KEY);
    const { data } = decode;
    const userId = data._id;
    const userRole = data.role;
    const recipe = await Recipe.getRecipeById(id);
    if (userId === recipe.userId || userRole === 'admin') {
      const updateRecipe = await Recipe.update(id, name, ingredients, preparation);
      return res.status(STATUS_200).json(updateRecipe);
    }
    return res.status(e500.status).json({ message: e500.message });
  } catch (err) {
    return res.status(e500.status).json({ message: e500.message });
  }
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;

  await Recipe.deleteRecipe(id);
  return res.status(STATUS_204).json();
});

module.exports = {
  create,
  getAll,
  getRecipeById,
  update,
  deleteRecipe,
};