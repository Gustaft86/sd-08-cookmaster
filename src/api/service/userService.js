const express = require('express');
const bodyParser = require('body-parser');
const {
  UNPROCESSABE_ENTITY,
  CREATED,
  OK,
  ID_LENGTH,
  BAD_REQUEST
} = require('./consts');
const { verifyConflictEmails, addUser } = require('../models/usersModel');
const { verify } = require('sinon');

const app = express();
app.use(bodyParser.json());

const validateEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)/;
  return emailRegex.test(email);
};

const userValidation = (body) => {
  const { name, email, password } = body;
  if (!name || !email || !password || !validateEmail(email)) {
    throw {
      status: BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
  }
};

// 1 - Crie um endpoint para o cadastro de usuários
const tryAddUser = async (body, res) => {

  try {
    await verifyConflictEmails(body.email);
    userValidation(body);
    const userAdd = await addUser(body);
    return res.status(CREATED).json({user: userAdd});
  } catch (error) {
    return res.status(error.status).json({'message': error.message});
  }
};

module.exports = {
  tryAddUser
};