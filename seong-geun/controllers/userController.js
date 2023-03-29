const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { id, userProfileImage, userName, age, email, password } = req.body;

    if (!id || !userProfileImage || !userName || !age || !email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(
      id,
      userProfileImage,
      userName,
      age,
      email,
      password
    );
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
