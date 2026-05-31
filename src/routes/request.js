const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post('/request/send/:status/:userId', userAuth, async(req, res) => {
    try{
        const { status, userId } = req.params;
        const fromUserId = req.user._id;
        const toUserId = userId;
        if (!(status === 'interested' || status ==='ignored')) {
            throw new Error("Invalid status");
        }
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("User not found");
        }
        const existingRequest = await connectionRequest.findOne({ 
            $or: [{ fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }]
        });
        if (existingRequest) {
            throw new Error("Request already exists");
        }
        const newRequest = new connectionRequest({
            fromUserId,
            toUserId,
            status
        });
        await newRequest.save();
        res.json({"message": "Request sent successfully", "request": newRequest});
    } catch (error) {
        res.status(500).json({"error": error.message});
    }
})

module.exports = requestRouter;