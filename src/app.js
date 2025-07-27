const express = require("express");
const connectDB = require("./Config/database.js");
const User = require("./models/user.js");
const EmailVerify = require("./models/verifyEmail.js");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password, name, verificationCode } = req.body;
  try {
    const record = await EmailVerify.findOne({ email });
    if (!record || record.verificationPassword !== verificationCode) {
      return res.status(400).send("Invalid or expired verification code.");
    }
    const user = new User({ email, password, name });
    await user.save();

    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Signup failed: " + err.message);
  }
});


// Send Verification Email Route

app.post("/send-verification", async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).send("Both email and name are required.");
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    await EmailVerify.insertOne({
      email,
      verificationPassword: code,
    });
    const emailPayload = {
      name: name,
      to: email,
      subject: "SSO Credentials",
      content: `Hi ${name}, Happy to serve You. Your OTP is: ${code}`
    };
    await axios.post("https://swayam.onrender.com/email/send_email", emailPayload);

    res.send("Verification code sent to email.",emailPayload);
  } catch (err) {
    console.error("Email send error:", err.message);
    res.status(500).send("Error sending verification email: " + err.message);
  }
});



// Get User By EmailID
app.get("/users", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmailId });
    if (users.length === 0) {
      return res.status(404).send("User Not Found");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(400).send("Some thing Went Wrong", err.message);
  }
});

//Get All Users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send("Some thing Went Wrong", err.message);
  }
});

//Delete User By EmailID
app.delete("/user", async (req, res) => {
  const userID = req.body.userId;
  try {
    const user = await User.findOneAndDelete({ emailId: userID });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User Deleted Sucessfully");
  } catch (err) {
    res.status(400).send("Some thing Went Wrong", err.message);
  }
});

//Upadte data of user by ID
app.patch("/user", async (req, res) => {
  const userID = req.body.emailId;
  const data = { ...req.body };

  delete data.emailId;

  const allowedUpdateFields = [
    "firstName",
    "lastName",
    "password",
    "age",
    "userId",
    "photoUrl",
  ];

  const isAllowed = Object.keys(data).every((key) =>
    allowedUpdateFields.includes(key)
  );

  if (!isAllowed) {
    return res.status(400).send("Invalid fields in request body");
  }

  try {
    const user = await User.findOneAndUpdate({ emailId: userID }, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

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

