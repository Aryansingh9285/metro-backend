const express = require("express");
const { validatesignupdata } = require("../../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const connect = require("../../Config/connect");
// const multer = require('multer');
// const csv = require('csv-parser');
const fs = require("fs");
const StationData = require("../../models/stationsData");
const axios = require("axios");

exports.signup = async (req, res) => {
  try {
    validatesignupdata(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordhash,
    });
    await user.save();
    res.send("User Added Sucessfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return req.status(400).send("User not Found");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      return req.status(400).send("Invalid Credencial");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return req.status(400).send("Invalid Credencial");
    }
    res.send("Login Sucessfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.sendVerification = async (req, res) => {
  const emailId = req.body.email;
  const name = req.body.name;
  console.log(req.body, "vdfevhfgwhehfweafvwehavfhwkadfwk");
  if (!emailId || !name) {
    return res.status(400).send("Both email and name are required.");
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    let dbResource = await connect.getDBConnection();
    await dbResource
      .collection("emailverifies")
      .insertOne({ emailId: req.body.email, verificationPassword: code });

    const emailPayload = {
      name: name,
      to: emailId,
      subject: "SSO Credentials",
      content: `Hi ${name}, Happy to serve You. Your OTP is: ${code}`,
    };
    await axios.post(
      "https://swayam.onrender.com/email/send_email",
      emailPayload
    );

    res.send("Verification code sent to email.", emailPayload);
  } catch (err) {
    console.error("Email send error:", err.message);
    res.status(500).send("Error sending verification email: " + err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  console.log(req.body.emailId);
  if (req.body.emailId != null) {
    let dbResource = await connect.getDBConnection();
    let find_user = await dbResource
      .collection("users")
      .findOne({ emailId: req.body.emailId });

    return find_user;
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { emailId, newPassword } = req.body;

    if (!emailId || !newPassword) {
      return res
        .status(404)
        .send("There is some issue with the emailid and Password");
    }
    let dbResource = await connect.getDBConnection();
    let User_Collection = await dbResource.collection("users");
    const user = await User_Collection.findOne({ emailId: req.body.emailId });

    if (!user) {
      return res.status(400).send("the user is not valid");
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);
    await User_Collection.updateOne(
      { emailId },
      { $set: { password: hashedPass } }
    );

    res.send("Password updated successfully.");
  } catch (err) {
    console.error("Password update error:", err.message);
    res.status(500).send("Error updating password: " + err.message);
  }
};

// const upload = multer({ dest: 'uploads/' });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   const results = [];

//   if (!req.file) {
//     return res.status(400).json({ message: "CSV file is required." });
//   }

//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on('data', (data) => {
//       results.push({
//         Name: data.Name,
//         Line: data.Line,
//         Index: Number(data.Index),
//         Interchanges: data.Interchanges || ''
//       });
//     })
//     .on('end', async () => {
//       try {
//         await StationData.insertMany(results);
//         fs.unlinkSync(req.file.path); // Remove the file after processing
//         res.status(200).json({ message: "Data uploaded successfully." });
//       } catch (error) {
//         res.status(500).json({ message: "Error saving data.", error });
//       }
//     });
// });
