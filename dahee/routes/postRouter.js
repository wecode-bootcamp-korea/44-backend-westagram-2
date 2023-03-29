const express = require('express');
const postController = require('../controllers/postController');
const loginReq = require('../utils/auth');
//import { loginReq } from '../utils/auth.js';

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

//loginRequired middleware를 추가하고 싶으면, 엔드포인트와 다음 파일 사이에 인자로 추가하면 됨
//utils directory를 따로 만들어서 그 폴더에 auth.js 라는 파일 middleware를 정의함
//router.all이라는 메서드는 모든 메서드에 대해 적용한다는 뜻

module.exports = {
  router,
};
