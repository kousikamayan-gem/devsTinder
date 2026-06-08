const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const user = require('../models/user');

const SEND_DATA = 'firstName lastName skills about photoURL';
userRouter.get('/user/request/received',userAuth, async(req, res) => {
    try {

        const userId = req.user._id;
        if (!userId) {
            throw new Error("User not found");
        }
        const receivedRequests = await connectionRequest.find({ toUserId: userId, status: 'interested' }).populate('fromUserId', SEND_DATA);
        res.json({ "message": "Received requests fetched successfully", "data": receivedRequests});
    } catch (error) {
        res.status(500).json({"error": error.message}); 
    }
})

userRouter.get('/user/connections', userAuth, async(req, res)=> {
    try {
        const userId = req.user._id;
        if (!userId) {
            throw new Error("User not found");
        }
        const connections = await connectionRequest.find({
            $or: [
                { fromUserId: userId, status: 'accepted' },
                { toUserId: userId, status: 'accepted' }
            ]
        }).populate('fromUserId toUserId', SEND_DATA);

        const responseConnection = connections.map(row => {
            if (row.fromUserId._id.equals(userId)) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({"connections": responseConnection})


    } catch(error) {
        res.status(500).json({"errror": error.message})
    }
})

userRouter.get('/feed', userAuth, async(req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = Math.min(limit, 50)
        const skip = (page - 1)* limit;
        const connections = await connectionRequest.find({
            $or: [ {fromUserId: userId}, {toUserId: userId}]
        }).select('fromUserId toUserId')
        console.log(connections);

        const hideUsers = new Set();
        connections.map(connection => {
            hideUsers.add(connection.fromUserId.toString());
            hideUsers.add(connection.toUserId.toString());
        });

        const feedConnections = await user.find({
            $and: [
                {_id: {$nin: Array.from(hideUsers)}},
                {_id: {$ne: userId}}
            ]
        }).select(SEND_DATA).skip(skip).limit(limit);

        res.json({"message": "Feed fetched successfully", "data": feedConnections})

    } catch (error) {
        res.status(500).json({"error": error.message})
    }
})

module.exports = userRouter;