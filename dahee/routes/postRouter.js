const express = require('express');
const postController = require('../controllers/postController');
const loginReq = require('../utils/auth');

const router = express.Router();
try {
  router.post('/newpost', loginReq, postController.newPostUp);
  router.get('', postController.getAllPosts);
  router.patch('/:userId/:postId', postController.updatePost);
  router.delete('/:postId', postController.deletePost);
  router.get('/:userId', postController.postsByUser);
} catch (err) {
  console.log(err);
}

module.exports = {
  router,
};
