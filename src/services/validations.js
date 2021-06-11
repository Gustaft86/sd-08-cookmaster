const {code, message} = require('../helper/status');

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const userBodyRequest = (user) => {
  if(
    !user || !user.name || !user.email || !user.password || !emailRegex.test(user.email)
  ){
    throw new Error(
      JSON.stringify(
        {
          status: code.UNPROCESSABLE,
          message: message.invalid_entries
        }
      )
    );
  }
};

const userAlreadyExists = (userExists) => {
  if(userExists) {
    throw new Error(
      JSON.stringify(
        {
          status: code.CONFLICT,
          message: message.email_registred,
        }
      )
    );
  }
};

const loginBodyRequest = (user) => {
  if(
    !user || !user.email || !user.password
  ){
    throw new Error(
      JSON.stringify(
        {
          status: code.UNAUTHORIZED,
          message: message.fields_must_be_filled,
        }
      )
    );
  };
};

const loginIsValid = (user, dbUser) => {
  if(!dbUser || user.password !== dbUser.password) {
    throw new Error(
      JSON.stringify(
        {
          status: code.UNAUTHORIZED,
          message: message.inc_user_or_pass,
        }
      )
    );
  }
};

const recipeBodyRequest = (recipe) => {
  if(
    !recipe || !recipe.name || !recipe.ingredients || !recipe.preparation 
  ){
    throw new Error(
      JSON.stringify(
        {
          status: code.UNPROCESSABLE,
          message: message.invalid_entries
        }
      )
    );
  }
};

module.exports = {
  userBodyRequest,
  userAlreadyExists,
  loginBodyRequest,
  loginIsValid,
  recipeBodyRequest,
};