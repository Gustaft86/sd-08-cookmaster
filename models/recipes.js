const connection = require('./mongoConnection');

const createRecipe = async (name, ingredients, preparation, userId) => await connection()
  .then(
    (db) => db.collection('recipes').insertOne({name, ingredients, preparation, userId}))
  .then(
    (result) => ({ recipe: {
      _id: result.insertedId, 
      name, 
      ingredients, 
      preparation, 
      userId
    }
    })
  );

const getAll = async () => await connection()
  .then((db) =>  db.collection('recipes').find().toArray());

module.exports = { 
  createRecipe,
  getAll,
};