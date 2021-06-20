const Service = require('../services/RecipeService');

const httpCreateSuccess = 201;


const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const result = await Service.create({name, ingredients, preparation});
    const recipe = {
      ...result,
      userId: req.user._id
    };

    res.status(httpCreateSuccess).json({recipe});
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});   
  }
};

module.exports = {
  create
};
