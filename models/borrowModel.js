const mongoose = require("mongoose");

let objectId = mongoose.Schema.Types.ObjectId;
const borrowSchema = new mongoose.Schema(
  {
    userID: {
      type: objectId,
      ref: "Users",
      required: true,
    },
    bookID: {
      type: objectId,
      ref: "Books",
      required: true,
    },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    isReturn:{type:Boolean ,default:false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
