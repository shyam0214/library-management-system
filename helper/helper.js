const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const saltRounds = process.env.SALT || 10;

async function ConvertHashPassword(password) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function ComparePassword(password, hashPassword) {
  const hash = await bcrypt.compare(password, hashPassword);
  return hash;
}

async function CreateToken(data) {
    let secretKey = process.env.SCREATEKEY || "codelengthtolong"
  const token = await jwt.sign(data, secretKey, {
    expiresIn: "2d",
  });
  return token;
}

async function VerifyToken(token) {
let secretKey = process.env.SCREATEKEY
  const tokens = await jwt.verify(token, secretKey);
  return tokens;
}

module.exports = {
  ConvertHashPassword,
  ComparePassword,
  VerifyToken,
  CreateToken,
};
