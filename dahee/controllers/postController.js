const postService = require('../services/postService');

const newPostUp = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.newPostUp(title, content, userId);
    res.status(201).json({ message: 'NEWPOST_UPLOADED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ messgae: err.message });
  }
};

module.exports = {
  newPostUp,
};
