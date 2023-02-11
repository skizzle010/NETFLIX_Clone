const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    Ttile: { type: String, required: true, unique: true },
    desc: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
