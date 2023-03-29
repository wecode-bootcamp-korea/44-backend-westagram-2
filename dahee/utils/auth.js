//loginRequired middleware - token으로 인가받은 유저인지 확인하는 과정
//payload에 jwt.verify로 정보를 담아줌
//payload 객체 안에서 key로 정보를 빼낼 수 있음
//req.userId = payload.id
//next()
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
