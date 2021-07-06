const connection = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connection();
  const addedUser = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return addedUser.ops[0];
};

const findEmail = async (email) => {
  const db = await connection();
  const findedEmail = await db.collection('users')
    .findOne({ email });
  return findedEmail;
};

// const getAllUsers = async () => {
//   const db = await connection();
//   const users = await db.collection('users')
//     .find()
//     .toArray();
    
//   if (users) return users;
// };

const addAdmin = async (name, email, password) => {
  const db = await connection();
  const addedAdmin = await db.collection('users')
    .insertOne({ name, email, password, role: 'admin' });
  return addedAdmin.ops[0];
};

module.exports = {
  // getAllUsers,
  addUser,
  findEmail,
  addAdmin,
};