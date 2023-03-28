const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();
router.post('/newpost', postController.newPostUp);

module.exports = {
  router,
};
