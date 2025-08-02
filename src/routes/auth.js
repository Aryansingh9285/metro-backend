const express = require('express');
const { validatesignupdata } = require('../utils/validation');
const authController = require("../modules/auth/authController")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/send-verification", authController.sendVerification);

module.exports = router;