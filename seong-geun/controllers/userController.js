const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { userProfileImage, userName, age, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(userProfileImage, userName, age, email, password);
    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
};
