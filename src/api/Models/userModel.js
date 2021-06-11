const connection = require('./conn');

const create = async (name, email, password) =>{
  const db = await connection();
  const newUser = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  // console.log(newUser);
  return newUser;
};

const findEmail= async (email) => {
  const db = await connection();
  const isFound = await db.collection('users').findOne({email});
  // console.log('aoba', isFound);
  return isFound;
};



module.exports = {
  create,
  findEmail,
};
