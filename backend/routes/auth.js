const express = require('express');
const argon2 = require('argon2');
const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/AppError');
const User = require('../models/user');
const {verify} = require('jsonwebtoken')
const config = require('config')
const {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} = require('../utils/token');

const authConfig = config.get('auth')

const router = express.Router();

router.post(
  '/register',
  handleAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user)
      return next(new AppError('User with this email already exists', 400));

    await User.create({
      name,
      email,
      password,
      clubs: [],
    });
    return res.status(200).json({
      suc: true,
      msg: 'user created ',
    });
  })
);

router.post(
  '/login',
  handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      next(new AppError('Could not find user', 400));
    }

    const valid = argon2.verify(user.password, password);

    if (!valid) {
      next(new AppError('Bad password', 400));
    }
    sendRefreshToken(res, createRefreshToken(user));

    res.status(200).json({
      accessToken: createAccessToken(user),
      user,
    });
  })
);


post("/refresh_token", handleAsync(async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload = null
  try {
    payload = verify(token, authConfig.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return next(new AppError('Could not find User', 400))
  }

  // token is valid and
  // we can send back an access token
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return next(new AppError('Could not find User', 400))
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return next(new AppError('User refresh token expired', 400))
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.status(200).json({ suc: true, accessToken: createAccessToken(user) });
}));

module.exports = router;

/*
const createSignToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
};

const sendToken = (user, statusCode, res) => {
	const token = createSignToken(user._id);

	// user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		token,
		user,
	});
};
*/
