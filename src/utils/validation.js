const validator = require("validator");

const validatesignupdata = (req) => {
    const { emailId, password, firstName, lastName } = req.body;

    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("All fields are required");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email format");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Weak password");
    }
};

module.exports = {
    validatesignupdata
};
