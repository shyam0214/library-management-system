const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.authentication = async (req, res, nest) => {
  try {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token)
      return res
        .status(400)
        .send({ status: false, message: "Token Is Required" });
    await jwt.verify(token, process.env.SCREATEKEY, (err, decode) => {
      if (err) return res.status(400).send({ status: false, message: err });
      req.details = decode;
      nest();
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.authorization = async (req, res, nest) => {
  try {
    let data = req.details;
    let userDetails = await userModel.findById(data.id);
    console.log(userDetails)
    req.details = userDetails
    if (!userDetails)
      return res.status(404).send({ status: false, message: "Invalid User " });
    nest();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
