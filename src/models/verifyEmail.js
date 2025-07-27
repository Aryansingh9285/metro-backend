const mongoose = require("mongoose");

const EmailVerifySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  verificationPassword: {
    type: String,
    required: true,
  },
},{timestamps:true});
module.exports = mongoose.model("EmailVerify", EmailVerifySchema);
