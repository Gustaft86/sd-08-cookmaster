const { ObjectID } = require('mongodb');
const connect = require('./connection');

const addRecipe = async ({ name, ingredients, preparation, userId }) => {
  const response = await connect()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));

  return response.ops[0];
};

const getAllRecipes = async () => {
  const response = await connect()
    .then((db) => db.collection('recipes').find().toArray());
  
  return response;
};

const getRecipeId = async (id) => {
  const response = await connect()
    .then((db) => ObjectID.isValid(id)
      ? db.collection('recipes').find({ _id: ObjectID(id) }).toArray()
      : null);

  return response;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeId
};
