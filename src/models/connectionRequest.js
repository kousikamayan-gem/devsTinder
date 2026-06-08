const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['interested', 'ignored', 'accepted', 'rejected'],
        message: `{VALUE} is not a valid status`,
        required: true,
    }
},{
    timestamps: true
})

// compound index to ensure unique connection request between two users
connectionRequestSchema.index({fromUserId: 1, toUserId: 1})
// checkinng from and to user id are not same
connectionRequestSchema.pre('save', function(next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("fromUserId and toUserId cannot be the same");
        next();
    }
})

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);