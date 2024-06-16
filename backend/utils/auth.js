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
      return res.status(200).json({ role: 'Admin' });
   } else if (req.user.role === 'Group Leader') {
      return res.status(200).json({ role: 'Group Leader' });
    } else if (req.user.role === 'Teacher' ) {
      return res.status(200).json({ role: 'Teacher' });
    } else if (req.user.role === 'Student' ) {
      return res.status(200).json({ role: 'Student' });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;