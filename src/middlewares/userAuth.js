const userAuth = (req, res, next) => {
    console.log('Checking authorization for /user route');
    let token ="xyz"
    if (token === "xyz") { 
        // res.send('Authorized');
        next()
    } else {
        res.status(401).send('Unauthorized');
    }
}
const adminAuth = (req, res, next) => {
    console.log('Checking authorization for /admin route');
    let token ="xyz"
    if (token === "xyz") { 
        // res.send('Authorized');
        next()
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = {
    userAuth,
    adminAuth
}