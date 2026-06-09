const express = require('express');
const authRouter = express.Router();
const byscrypt = require('bcrypt');
const { validateSignupData } = require('../utils/validation');
const User = require('../models/user');

authRouter.post('/signup', async(req, res)=> {
   
    try {
        validateSignupData(req);
        const { firstName, lastName, email } = req.body;
        const {password} = req.body;
        const hashedPassword = await byscrypt.hash(password, 10);
         const userObject = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
         })
        await userObject.save();
        res.send("User added succesfully")
    } catch (error) {
        res.status(400).send(error.message);
    }

})
authRouter.post('/login', async(req,res)=> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if (!user) {
            throw new Error("Invalid email or password")
        }
        const isPasswordMatch = await user.passwordValidation(password);
        if (!isPasswordMatch) {
            throw new Error("Invalid email or password")
        }
        // create jwt teken
        const token = user.getJWT();
        // add jwt token in cookie
        res.cookie("token", token);
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

authRouter.post('/logout', async(req, res)=> {
    res.cookie("token", null, { expires: new Date(0) });
    res.send("Logout successful");

})
module.exports = authRouter;