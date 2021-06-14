const { connection } = require('./connection');
const saveMe = require('../utils/saveMe');

const create = saveMe(async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId
  });
  
  return {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId
  };
});

const getAll = saveMe(async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
});

module.exports = {
  create,
  getAll
};
