const AppError = require('../utils/AppError');
const config = require('config');
const { verify } = require('jsonwebtoken');

const Auth = handleAsync(async (req, res, next) => {
  const authHeader = req.header['authorization'];
  if (!authHeader) {
    return next(new AppError('No Authorization headers provided', 401));
  }

  const authConfig = config.get('auth');
  const token = authorization.split(' ')[1];
  const payload = verify(token, authConfig.ACCESS_TOKEN_SECRET);


  const user = await User.findById(payload.userId);

  if (!user) {
    return next(new AppError('No user found', 401));
  }
  req.user = user;
  next();
});

module.exports = Auth