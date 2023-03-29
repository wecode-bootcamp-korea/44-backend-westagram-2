const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
try {
  router.post('/signup', userController.signUp);
  router.post('/signin', userController.signIn);
} catch (err) {
  console.log(err);
}

module.exports = {
  router,
};
