const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const initializeSocket = require('./utils/socket');
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, //
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user')
const chatRouter = require('./routes/chat');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', chatRouter);

const server = http.createServer(app);

initializeSocket(server);

const connectDB = require('./config/database');
connectDB().then(() =>{
    console.log('Connected to MongoDB');
    server.listen(7777, () => {
    console.log('Server is running on port 7777');
})
});
