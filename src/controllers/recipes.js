const recipesService = require('../services/recipes');

const OK = 200;
const Created = 201;
const NoContent = 204;
const BadRequest = 400;
const Unauthorized = 401;
const NotFound = 404;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await recipesService
      .createRecipe(name, ingredients, preparation, userId);
    console.log(newRecipe);
    res.status(Created).json(newRecipe);
  } catch (err) {
    res.status(BadRequest).json({
      message: err.message,
    });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();

    res.status(OK).json(recipes);
  } catch (err) {
    res.status(BadRequest).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);

    res.status(OK).json(recipe);
  } catch (err) {
    res.status(NotFound).json({ message: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { _id: userId } = req.user;
    console.log(userId);
    const recipe = await recipesService.updateRecipe(id, {
      name, ingredients, preparation, userId
    });

    res.status(OK).json(recipe);
  } catch (err) {
    res.status(Unauthorized).json({
      message: err.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    await recipesService.deleteRecipe(id);

    res.status(NoContent).end();
  } catch (err) {
    res.status(BadRequest).json({
      message: err.message,
    });
  }
};


const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const image = `localhost:3000/${path}`;
    const imageToUpload = await recipesService.uploadImage(id, image);

    res.status(OK).json(imageToUpload);
  } catch (err) {
    res.status(BadRequest).json({ message: 'upload failed' });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage
};
