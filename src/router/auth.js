const express = require('express');
const { validatesignupdata } = require('../utils/validation');
const bcrypt = require("bcrypt")
const User = require("../models/user")

const authRouter = express.Router()

authRouter.post("/signup", async (req,res) =>{
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
});




module.exports = authRouter;