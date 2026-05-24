const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Invalid Password")
            }
        }
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
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid Photo URL")
            }
        },
        default: 'https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180'
    },
    skills: {
        type: [String]
    },
    
},{
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema);