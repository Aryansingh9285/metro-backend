const express = require("express");
const connectDB = require("./Config/database.js");
const User = require("./models/user.js");
const EmailVerify = require("./models/verifyEmail.js");
const app = express();
const axios = require("axios");

app.use(express.json());


const AuthRouter = require("./router/auth.js");
const verificationRouter = require("./router/sendVerificationCode.js")



app.use("/", AuthRouter);
app.use("/", verificationRouter)





// Send Verification Email Route


connectDB()
  .then(() => {
    console.log("Database connnection Sucessfull.....");
    app.listen(4000, () => {
      console.log("Server is running on port 4000....");
    });
  })
  .catch((err) => {
    console.log("Database connection Failed.......");
  });

