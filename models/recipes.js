const connection = require('./mongoConnection');
const { ObjectId, ObjectID } = require('mongodb');

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
  .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const update = async ({ id, name, ingredients, preparation, userId }) => 
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      {$set: { name, ingredients, preparation }}
    ))
    .then(() => ({ name, ingredients, preparation }))
    .then(() => ({_id: id, name, ingredients,  preparation, userId,}));

    
module.exports = { 
  createRecipe,
  getAll,
  getById,
  update,
};