const express = require('express');

const chatRouter = express.Router();
const { userAuth} = require('../middlewares/auth');
const Chat = require('../models/chat');
chatRouter.get('/chat/:requestId',userAuth,async(req, res)=>{
    try {
        const userId = req.user._id;
        const {requestId} = req.params;
        let chat = await Chat.findOne({
            participants: { $all: [userId, requestId]}
        }).populate({path: 'messages.senderId', select: 'firstName lastName' })
        if (!chat) {
            chat = new Chat({
                participants: [userId, requestId],
                messages: []
            })
            await chat.save();
        }
        console.log(chat)
        res.json(chat);

    } catch (error) {
        res.status(500).json({"error": error.message});
    }
})

module.exports = chatRouter;