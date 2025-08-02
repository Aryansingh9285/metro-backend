const authService = require('./authService');

exports.signup = async (req,res)=>{
    const  signup_response = await  authService.signup(req,res);
    res.send(signup_response);
}

exports.sendVerification = async (req,res)=>{
    const  send_verification_response = await  authService.sendVerification(req,res);
    res.send(send_verification_response);
}