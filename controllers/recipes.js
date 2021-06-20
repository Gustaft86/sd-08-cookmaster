const services = require('../services/recipes');

const OK = 200;
const CREATED = 201;
const BAD = 400;
const NOT_FOUND = 404;

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation, userId } = req.body;
    const newRecipe = await services.createRecipe(
      name,
      ingredients,
      preparation,
      userId
    );
    res.status(CREATED).json(newRecipe);
  } catch (error) {
    (newRecipe.error === 'Invalid entries. Try again.') && res
      .status(BAD).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const user = await services.getAll();
    res.status(OK).json(user);
  } catch (error) {
    res.status(BAD).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await services.getById(id);
    return res.status(OK).json(recipe);
  } catch (error) {
    res.status(NOT_FOUND).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const form = req.body;
    const { id } = form.userId;
    console.log('form: ', form);
    const result = await services.update({ id, ...form });
    return res.status(OK).json(result);
  } catch (error) {
    res.status(BAD).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
}; 