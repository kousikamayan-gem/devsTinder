const mongoose = require('mongoose');
const dns = require('dns');


const connectDB = async () => {
    try {
        await mongoose.connect(
'vvvv'
);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;