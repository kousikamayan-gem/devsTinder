const validator = require('validator');

const validateSignupData = (req)=> {
    const { firstName, lastName, email, password} = req.body;
    if (!firstName || !email || !password) {
        throw new Error("Missing required fields: firstName, email, and password are required.");
    }
    else if (firstName.length < 2 || firstName.length > 50) {
        throw new Error("First name must be between 2 and 50 characters.");
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one symbol, and one number.");
    }
}

module.exports = {
    validateSignupData,
}