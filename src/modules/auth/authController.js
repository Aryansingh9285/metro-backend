const authService = require("./authService");

exports.signup = async (req, res) => {
  const signup_response = await authService.signup(req, res);
  res.send(signup_response);
};

exports.login = async (req, res) => {
  const login_response = await authService.login(req, res);
  res.send(login_response);
};

exports.sendVerification = async (req, res) => {
  const send_verification_response = await authService.sendVerification(
    req,
    res
  );
  res.send(send_verification_response);
};

exports.forgotCredentials = async (req, res) => {
  
  const forgotCredentials = await authService.forgotPassword(req, res);
  console.log("isUser", forgotCredentials);
 let sendVerificationRequest = {

 }
   sendVerificationRequest["body"] = {   
  email: "as.aryansingh2004@gmail.com",
  name: "Aryan Singh"
  };
console.log(sendVerificationRequest)
  const send_verification_response = await authService.sendVerification(
    sendVerificationRequest,
    res
  );
  res.send("Sucess");
};


exports.updatePassword = async (req, res) => {
  const updatePassword_response = await authService.updatePassword(req, res);
  res.send(updatePassword_response);
};