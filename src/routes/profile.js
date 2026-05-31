const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateProfileEditData} = require('../utils/validation');
profileRouter.get('/profile/view', userAuth, async(req, res) => {
    try{
        const user = req.user
        res.send(user)
    } catch (error) {
        res.status(500).send("Error finding user")
    }
})
profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
    try {
        const isAllowToEdit = validateProfileEditData(req);
        if (!isAllowToEdit) {
            return res.status(400).send("Invalid updates! You can only update these fields: firstName, lastName, age, skills, about, photoURL")
        }
        const user = req.user;
        Object.keys(req.body).forEach((field) => { user[field] = req.body[field] });
        await user.save();
        res.json({ message: `${user.firstName}'s profile updated successfully`, data: { user } });

    } catch (error) {
        res.status(500).send(error.message);
    }
})
module.exports = profileRouter;