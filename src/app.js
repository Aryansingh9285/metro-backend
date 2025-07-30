const express = require("express");
const connectDB = require("./Config/database.js");
const app = express();

app.use(express.json());


const AuthRouter = require("./router/auth.js");
const verificationRouter = require("./router/sendVerificationCode.js")


app.use("/", AuthRouter);
app.use("/", verificationRouter)



connectDB()
  .then(() => {
    console.log("Database Connnection Sucessfull.....");
    console.log("Commit Successfully !")
    app.listen(4000, () => {
      console.log("Server is Running on port 4000....");
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed.......");
  });

