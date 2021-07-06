const AppError = require('../utils/AppError');
const config = require('config');
const { verify } = require('jsonwebtoken');
const handleAsync = require('../utils/handleAsync');
const User = require('../models/user')


const Auth = handleAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError('No Authorization headers provided', 401));
  }
  const authConfig = config.get('auth');
  const token = authHeader.split(' ')[1];
  const payload = verify(token, authConfig.ACCESS_TOKEN_SECRET);

  const user = await User.findById(payload.userId);

  if (!user) {
    return next(new AppError('No user found', 401));
  }
  req.user = user;
  next();
});

module.exports = Auth