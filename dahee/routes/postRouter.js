const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();
try {
  router.post('/newpost', postController.newPostUp);
  router.get('', postController.getAllPosts);
  router.patch('/:userId/:postId', postController.updatePost);
} catch (err) {
  console.log(err);
  return res.status(err.statusCode || 400).json({ message: err.message });
}

module.exports = {
  router,
};
