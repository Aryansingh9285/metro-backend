const express = require('express');
const { validatesignupdata } = require('../../utils/validation');
const bcrypt = require("bcrypt")
const User = require("../../models/user")

exports.signup = async(req,res) =>{
    try{
        validatesignupdata(req);
        const {firstName , lastName,emailId, password}= req.body;
        const passwordhash = await bcrypt.hash(password , 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordhash
        });
    await user.save();
    res.send("User Added Sucessfully");
    }catch(err){
        res.status(400).send(err.message);
    }
};

exports.sendVerification = async(req, res) => {
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
};