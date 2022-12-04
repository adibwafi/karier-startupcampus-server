const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "rahasiaNegara";
function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}
function comparePassword(password, hashed) {
  return bcrypt.compareSync(password, hashed);
}
function signToken(payload) {
  return jwt.sign(payload, SECRET);
}
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
module.exports = { encryptPassword, comparePassword, signToken, verifyToken };
