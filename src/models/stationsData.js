const mongoose = require("mongoose");

const StationDataSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  Line: {
    type: String,
    required: true,
  },
  Index: {
    type: Number,
    required: true,
  },
  Interchanges: {
    type: String,
  },
},{timestamps:true});
module.exports = mongoose.model("StationData", StationDataSchema);
