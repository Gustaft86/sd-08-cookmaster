const rescue = require('express-rescue');

const Services = require('../services/recipe');

const NOCONTENT = 204;

module.exports = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  await Services.deleteRecipeById(token, id);
  res.status(NOCONTENT).send();
});
