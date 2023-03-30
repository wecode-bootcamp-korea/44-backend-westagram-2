const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'unauthorized' });
    }
  
    try { //예외처리하기, payload 내의 email, user_id 일치하는지 보기
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded.userId;
      
      next();
    } catch (err) {
      return res.status(401).json({ message: 'unauthorized' });
    }
  };


module.exports = { authorize }