const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
try {
  router.post('/signup', userController.signUp);
} catch (err) {
  console.log(err);
}

module.exports = {
  router,
};
