const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; 

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token, secretKey);
      req.user = decodedToken;
      next(); 
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = requireAuth;