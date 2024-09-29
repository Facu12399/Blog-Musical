// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../config/config.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (token == null) {
    console.log('Token is null');
    return res.sendStatus(401);
  }
  
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.user = data;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
