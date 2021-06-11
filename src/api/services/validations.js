const UserModel = require('../models/userModel');
const ErrorMessages = require('../../error/errorMessages');
const CustomError = require('../../error/customError');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const validateNameIsRequire = (userName) => {
  if (!userName || typeof userName !== 'string') {
    console.log(userName);
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

const validatePasswordIsRequire = (password) => {
  if (!password || typeof password !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

const validateEmailIsRequire = (email) => {
  if (!email || typeof email !== 'string') {    
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

const validateEmailAlreadyExists = async (email) => {
  const user = await UserModel.findByEmail(email);
  if (user) {
    throw new CustomError(
      ErrorMessages.emailAlreadyExists,
      CONFLICT,
    );
  }
};

// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
const validateEmailIsValid = (email) => {
  const isValid = /\S+@\S+\.\S+/.test(email);
  if (!isValid) {
    throw new CustomError(
      ErrorMessages.invalidEntries,
      BAD_REQUEST,
    );
  }
};

module.exports = {
  validateNameIsRequire,
  validateEmailIsRequire,
  validatePasswordIsRequire,
  validateEmailAlreadyExists,
  validateEmailIsValid,  
};
