const jwt = require('jsonwebtoken');
const secretkey = 'your_secret_key_here'; 

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretkey); 
    req.user = { userid: decoded.userid };
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = isAuthenticated;
