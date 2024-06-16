const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    console.log(`User role: ${req.user.role}`);
    console.log(decoded);
    const path = req.path;
    console.log(req.user.user_id);
    if (req.user.role === 'Admin') {
      next();
    } else if (req.user.role === 'Group Leader' && path.startsWith('/group-leaders') || path.startsWith('/users')) {
      next();
    } else if (req.user.role === 'Teacher' && path.startsWith('/teachers') || path.startsWith('/users')) {
      next();
    } else if (req.user.role === 'Student' && path.startsWith('/students') || path.startsWith('/users')) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
    }
  } catch (err) {
    console.error('Authentication error:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
