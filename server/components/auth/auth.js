const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.isAuthorized = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const decoded = jwt.verify(authorization?.split(' ')?.[1], process.env.JWT_PRIVATE_KEY);
    if (decoded) next();
  } catch (error) {
    next(createError(401, 'Unauthorized Request'));
  }
};
