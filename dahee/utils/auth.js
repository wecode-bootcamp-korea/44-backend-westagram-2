const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const loginReq = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = loginReq;
