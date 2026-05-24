const express = require('express');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const byscrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middlewares/auth');
app.use(express.json());
app.use(cookieParser());
app.post('/signup', async(req, res)=> {
   
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
        console.error('Error adding user:', error);
        res.status(400).send(error.message);
    }

})
app.get('/login', async(req,res)=> {
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
        res.send("Login successful");
    } catch (error) {
        res.status(500).send(error.message);
    }
})
app.get('/user', async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {            
            res.send(user)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send("Error finding user")
    }
})

app.get('/profile', userAuth, async(req, res) => {
    try{
        const user = req.user
        res.send(user)
    } catch (error) {
        res.status(500).send("Error finding user")
    }
})

app.post('/sendConnectionRequest', userAuth, async(req, res) => {
    try{
        res.send("Connection request sent successfully")
    } catch (error) {
        res.status(500).send("Error finding user")
    }
})

app.get('/feed', async(req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.status(500).send("Error fetching feed");
    }
})

app.delete('/user', async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.userId)
        res.send("User deleted successfully")
    } catch (error) {
        res.status(500).send("Error fetching user details");
    }
})

app.patch('/user/:userId', async(req,res) => {
    try {
        const userId = req.params.userId;
        const  data = req.body;
        const allowedUpdates = ['userId','firstName', 'lastName','age','skills', 'about', 'photoURL'];
        const isAllowUpdate = Object.keys(data).every((e)=> allowedUpdates.includes(e));
        if (!isAllowUpdate) {
             return res.status(400).send("Invalid Updates: These fileds only can be updated - " + allowedUpdates.join(", "))
        }
        if (data.skills && data.skills.length > 10) {
            return res.status(400).send("You can add maximum 10 skills")
        }
        console.log(req.body);
        const user = await User.findByIdAndUpdate(userId, req.body, { runValidators: true })
        console.log(user);
        res.send("User updated successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})

const connectDB = require('./config/database')
connectDB().then(() =>{
    console.log('Connected to MongoDB');
    app.listen(7777, () => {
    console.log('Server is running on port 7777');
})
});
