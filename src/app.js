const express = require("express");
const connectDB = require("./Config/database.js");
const app = express();
app.use(express.json());

const authRoute = require("./routes/auth.js");
// Running Routes URL
app.use("/auth", authRoute);

connectDB()
  .then(() => {
    console.log("Database Connnection Sucessfull.....");
    console.log("Commit Successfully !")
    const PORT = process.env.PORT || 4010;
    app.listen(PORT, () => {
      console.log("Server is Running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed.......");
  });

