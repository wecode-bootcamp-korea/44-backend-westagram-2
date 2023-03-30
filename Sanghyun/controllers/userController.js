const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { userName, email, profileImage, userPassword } = req.body;

    if (!userName || !email || !profileImage || !userPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const pwValidation = new RegExp(
      "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );
    if (!pwValidation.test(userPassword)) {
      const err = new Error("password is not valid");
      err.statusCode = 400;
      throw err;
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

const signIn = async (req, res) => {
  try{
    const {email, userPassword} = req.body;
    console.log('input: '+ email)
    console.log('input: '+ userPassword)
    if (!email || !userPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await userService.signIn(email, userPassword)

    res.status(200).json({ accessToken: result});
  }catch (err){
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createUser,
  signIn
};
