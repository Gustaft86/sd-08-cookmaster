const responsesNCodes = { // verificar/pesquisar http-status-code
  OK: {
    status: 200
  },
  CREATED: {
    status: 201
  },
  BAD_REQUEST: {
    status: 400,
    send: {
      message: 'Invalid entries. Try again.'
    }
  },
  CONFLICT: {
    status: 409,
    send: {
      message: 'Email already registered'
    }
  },
  UNAUTHORIZED: {
    status: 401,
    sendMissing: {
      message: 'All fields must be filled'
    },
    sendInvalid: {
      message: 'Incorrect username or password'
    },
    sendProblematicToken: {
      message: 'jwt malformed'
    }
  },
  NOT_FOUND: {
    status: 404,
    send: {
      message: 'recipe not found'
    }
  },
};

const { BAD_REQUEST, CONFLICT, UNAUTHORIZED, NOT_FOUND } = responsesNCodes;

const errors = {
  Users: {
    mustHaveName: BAD_REQUEST,
    mustHaveEmail: BAD_REQUEST,
    mustHavePassword: BAD_REQUEST,
    emailMustBeValid: BAD_REQUEST,
    emailMustBeUnique: CONFLICT,
    emailOrPasswordIsMissing: {
      status: 401,
      send: {
        message: 'All fields must be filled'
      },
    },
    emailOrPasswordIsInvalid: {
      status: 401,
      send: {
        message: 'Incorrect username or password'
      },
    },
  },
  Recipes: {
    mustHaveName: BAD_REQUEST,
    mustHaveIngredients: BAD_REQUEST,
    mustHavePreparation: BAD_REQUEST,
    notFound: NOT_FOUND,
    invalidToken: {
      status: 401,
      send: {
        message: 'jwt malformed'
      }
    }
  }
};


// class AppError extends Error {
//   constructor(message, status) {
//     super(message);

//     this.status = status,
//   }
// }

// Para futura refatoração
// const errorMessages = { 
//   validation: {
//     mustHaveName: 'Invalid entries. Try again.',
//     mustHaveEmail: 'Invalid entries. Try again.',
//     mustHavePassword: 'Invalid entries. Try again.',
//     emailMustBeValid: 'Invalid entries. Try again.',
//   },
//   application: {
//     emailMustBeUnique: 'Email already registered',
//   },
//   auth: {
//     emailOrPasswordIsMissing: 'All fields must be filled',
//     emailOrPasswordIsInvalid: 'All fields must be filled',
//   }
// };


module.exports = { errors, responsesNCodes };
