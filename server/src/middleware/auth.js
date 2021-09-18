const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).send({ "message": "You are unauthenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({"message": "Invalid Token"});
  }
  return next();
};
    

module.exports = auth;