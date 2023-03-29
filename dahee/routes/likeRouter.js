const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();
try {
  router.post('', likeController.newLike);
} catch (err) {
  console.log(err);
}

module.exports = {
  router,
};
