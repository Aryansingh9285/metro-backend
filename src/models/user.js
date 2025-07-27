// const { min } = require("bn.js");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email format" + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:15
  },
  gender: {
    type: String,
    validate (value)
    {if(!["male","female","other"].includes(value)){
        throw new Error(`This ${value} gender in not valid`)
    }
},
  },
  photoUrl: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
       validator(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid PhotoURL format" + value);
      }
    },
  },
 
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
