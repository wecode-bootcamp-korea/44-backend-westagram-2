const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp(name, email, password, profileImage);

    res.status(201).json({ message: 'SIGNUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ messgae: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const verificationResult = await userService.signIn(email, password);
    console.log(verificationResult);
    if (verificationResult) {
      res.status(200).json({ message: 'SIGNIN_SUCCESS' });
    } else {
      res.status(400).json({ message: 'INVALID_USER' });
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
