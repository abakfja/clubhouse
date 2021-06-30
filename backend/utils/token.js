const config = require("config");
const jsonwebtoken = require("jsonwebtoken");

const authConfig = config.get('auth')

const createAccessToken = (user) => {
  return jsonwebtoken.sign(
    { userId: user.id },
    authConfig.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const createRefreshToken = (user) => {
  return jsonwebtoken.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    authConfig.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const sendRefreshToken = (res, token) => {
  res.cookie('cid', token, {
    httpOnly: true,
    path: "/refresh_token"
  })
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
};
