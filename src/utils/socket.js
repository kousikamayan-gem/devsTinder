const socket = require('socket.io');
const crypto = require('crypto');
const Chat = require('../models/chat');
const getRoomId = (firstName, userId, requestId) => {
    return crypto.createHash('sha256').update([userId, requestId].sort().join('_')).digest('hex');
}
const initializeSocket = (server) => {
    const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
});
io.on('connection', (socket) => {

    socket.on('joinChat', ({firstName, userId, requestId})=>{
        const roomId = getRoomId(firstName, userId, requestId);
        console.log('Joining room:', firstName , roomId);
        socket.join(roomId);
    });
    socket.on('sendMessage', async({firstName, userId, requestId, message})=>{
        try {
            const roomId = getRoomId(firstName, userId, requestId);
            let chat = await Chat.findOne({
                participants: {$all: [userId, requestId]}
            });
            if (!chat) {
                chat = new Chat({
                    participants: [userId, requestId],
                    messages: []
                })
            }
            chat.messages.push({
                senderId: userId,
                message
            })
            await chat.save();
            io.to(roomId).emit('receiveMessage', {message, firstName});
            console.log('Message sent to room:', roomId, message, firstName);

        } catch (error) {
            console.error('Error sending message:', error);
        }
      
        
    });
    socket.on('disconnect',()=>{});

})
}

module.exports = initializeSocket;