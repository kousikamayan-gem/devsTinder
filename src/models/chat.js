const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        requiresd: true
    }
},{ timestamps: true})
const chatSChema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [messageSchema]
})

const Chat = mongoose.model('Chat', chatSChema);
module.exports = Chat;