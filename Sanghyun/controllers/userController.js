const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { userName, email, profileImage, userPassword } = req.body;
    if (!userName || !email || !profileImage || !userPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const message = await userService.createUser({
      userName,
      email,
      profileImage,
      userPassword,
    });

    res.status(200).json({ message: message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};
