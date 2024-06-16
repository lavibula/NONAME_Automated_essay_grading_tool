const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    console.log(req.user.role);
    if (req.user.role === 'Admin') {
      next();
    } else if (req.user.role === 'Group Leader' && path.startsWith('/group-leaders')) {
      next();
    } else if (req.user.role === 'Teacher' && path.startsWith('/teachers')) {
      next();
    } else if (req.user.role === 'Student' && path.startsWith('/students')) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;