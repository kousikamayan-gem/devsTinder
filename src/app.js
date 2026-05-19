const express = require('express');
const app = express();

app.get("/user/:userid/:password",(req,res) => {
    console.log(req.params)
    res.send('Hello World');
})
app.listen(7777, () => {
    console.log('Server is running on port 7777');
})