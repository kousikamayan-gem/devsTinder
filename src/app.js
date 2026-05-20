const express = require('express');
const app = express();
const {userAuth, adminAuth} = require('./middlewares/userAuth');
// Middleware function to check for authorization
app.use('/user', userAuth);
app.get("/user/adduser",(req,res,next) => {
    res.send('add user');
})
app.get("/user/deleteuser",(req,res,next) => {
    res.send('delete user');
})
app.get("/admin",adminAuth,(req,res,next) => {
    res.send('admin page');
})

//if no need authentication for that no need to add authentication middleware
app.post("/admin/signup",(req,res,next) => {
    res.send('admin page');
})

app.listen(7777, () => {
    console.log('Server is running on port 7777');
})