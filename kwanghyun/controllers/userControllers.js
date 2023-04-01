const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "KEY ERROR" });
    }

    await userService.signUp(name, email, password, profileImage);

    res.status(201).json({ message: "SIGNUP_SUCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const posts = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "KEY ERROR" });
    }

    const rows = await userService.posts(userId);
    res.status(200).json({ rows });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.signIn(email, password);
    res.status(201).json({ accessToken: token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  posts,
  signIn,
};
