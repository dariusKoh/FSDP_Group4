// authMiddleware.js
const { permissions } = require('./roles');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    // Get the required permission for the route
    const requiredPermission = req.route.path.split('/').pop();

    // Check if the user has the required permission
    if (!permissions[requiredPermission].includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;