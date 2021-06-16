const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  const result = await recipesService.createRecipes({...req.body, _id: req.user._id });
  res.status(result.code).json(result.message);
};

const getRecipes = async (_req, res) => {
  const result = await recipesService.getRecipes();
  res.status(result.code).json(result.message);
};

const findRecipes = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.findRecipes(id);
  res.status(result.code).json(result.message);
};

const updateRecipes = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.updateRecipes(req.user._id, req.body, id);
  res.status(result.code).json(result.message);
};

const deleteRecipes = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.deleteRecipes(id);
  res.status(result.code).json(result.message);
};

const imageUpdate = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.imageUpdate(id, req.file);
  res.status(result.code).json(result.message);
};

const getImage = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.getImage(id);
  res.status(result.code).sendFile(result.message, { root: __dirname });
};

module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
  deleteRecipes,
  imageUpdate,
  getImage,
};