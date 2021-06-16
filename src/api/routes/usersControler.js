const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const {
  tryAddUser,
  tryLogin
} = require('../service/userService');

const app = express();

https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

const router = express.Router();

// 2 - Crie um endpoint para o login de usuários
router.post('/login', rescue(async(req, res) => {
  const { body } = req;
  console.log(body);
  const end = await tryLogin(body, res);
  return end;
}));

// 1 - Crie um endpoint para o cadastro de usuários
router.post('/',
  // jsonParser,
  rescue(async(req, res) => {
    const { body } = req;
    const end = await tryAddUser(body, res);
    return end;
  }));
  



module.exports = { router };
