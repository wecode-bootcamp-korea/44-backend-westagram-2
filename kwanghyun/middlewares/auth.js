const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      const err = new Error("유효하지 않은 실행입니다.");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    if (!decoded) {
      const err = new Error("검증되지 않은 실행입니다.");
      err.statusCode = 401;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkToken,
};
