const express = require('express');
const { validatesignupdata } = require('../utils/validation');
const authController = require("../modules/auth/authController")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login )

router.post("/send-verification", authController.sendVerification);

router.post("/forgot-credentials", authController.forgotCredentials);

router.post("/password-update" , authController.passwordUpdate);



module.exports = router;