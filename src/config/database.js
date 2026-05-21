const mongoose = require('mongoose');
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
    try {
        await mongoose.connect(
'mongodb://kousikamayan_db_user:OzfMpRnnagnh0Zf4@ac-yd4pyis-shard-00-00.ur11zcm.mongodb.net:27017,ac-yd4pyis-shard-00-01.ur11zcm.mongodb.net:27017,ac-yd4pyis-shard-00-02.ur11zcm.mongodb.net:27017/devsTinder?ssl=true&replicaSet=atlas-9yzjpc-shard-0&authSource=admin&retryWrites=true&w=majority'
);
        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;