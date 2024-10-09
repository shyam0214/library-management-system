const mongoose = require("mongoose");
let objectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: objectId, ref: "Users", required: true }, 
  ISBN: { type: String, required: true, unique: true },
  publishYear: { type: Number, required: true },
  genre: { type: String, required: true },
}, 
{ timestamps: true });

let bookModel = mongoose.model("Books", bookSchema);

module.exports = bookModel;
