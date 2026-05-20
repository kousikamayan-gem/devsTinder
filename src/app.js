const express = require('express');
const app = express();

app.get("/user",[(req,res,next) => {
    console.log(req.params)
    next();
    // res.send('Hello World');
    
}], [(req, res,next) => {
    console.log('This is the second callback');
    next();
    // res.send('This is the second callback response');
    
},(req, res,next) => {
    console.log('This is the third callback');
    next();
    res.send('This is the third callback response');
}]);
app.listen(7777, () => {
    console.log('Server is running on port 7777');
})