const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        required: function Validate(value) {
            return ['male', 'female', 'other'].includes(value);
        }
    },
    about: {
        type: String,
        default: 'This is Default about section'
    },
    photoURL: {
        type: String,
        default: 'https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180'
    },
    skills: {
        type: [String]
    },
    
},{
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema);