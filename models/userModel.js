const mongoose = require("mongoose");
let objectId = mongoose.Schema.Types.ObjectId;
const User = new mongoose.Schema(
  {
    name: { type: String, required: true,},
    email: { type: String, required: true, unique: true },
    role:{type :String , required:true ,default:"customer"},
    password: { type: String, required: true },
  },
  { timestamps: true }
);

let userModel = mongoose.model("Users", User);

module.exports = userModel;
