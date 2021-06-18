const recipesModel = require('../models/recipesModel');
const { errors } = require('../utils/errorsNCodes');
const { Recipes: { notFound, invalidToken } } = errors;

const checkIdSearch = async (req, res, next) => {
  const idParams = req.params;
  const existsInDb = await recipesModel.getRecipeById(idParams.id);
  if (!existsInDb) return res
    .status(notFound.status).send(notFound.send);
  next();
};

const validateToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(invalidToken.status).send(invalidToken.sendProblematicToken);
  }
  next();
};

module.exports = { checkIdSearch, validateToken };
