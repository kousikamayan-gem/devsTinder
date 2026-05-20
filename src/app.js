const express = require('express');
const app = express();
const {userAuth, adminAuth} = require('./middlewares/userAuth');
// Middleware function to check for authorization

app.get("/getdata",(req,res,next) => {
    // type 1 handle error in route handler
    try{
        throw new Error("Something went wrong");
    } catch(err){
        console.error(err.stack);
        res.status(500).send('server error');
    }

    
    // res.send('get data');
})

// type 2 handle error handler in middleware
app.use("/", (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
})


app.listen(7777, () => {
    console.log('Server is running on port 7777');
})