const config = require('../config');
const jwtSecret = config.JWT_SECRET;
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'User token not found.' });
    }
  
    try {
      const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);
      req.userId = decodedToken.id;
     
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'User token expired.' }); 
      }
      
      
      return res.status(400).json({ message: error.message });
    }
  };
  module.exports ={
    verifyToken
  }