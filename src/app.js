const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
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

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

// app.patch('/user/:userId', async(req,res) => {
//     try {
//         const userId = req.params.userId;
//         const  data = req.body;
//         const allowedUpdates = ['userId','firstName', 'lastName','age','skills', 'about', 'photoURL'];
//         const isAllowUpdate = Object.keys(data).every((e)=> allowedUpdates.includes(e));
//         if (!isAllowUpdate) {
//              return res.status(400).send("Invalid Updates: These fileds only can be updated - " + allowedUpdates.join(", "))
//         }
//         if (data.skills && data.skills.length > 10) {
//             return res.status(400).send("You can add maximum 10 skills")
//         }
//         console.log(req.body);
//         const user = await User.findByIdAndUpdate(userId, req.body, { runValidators: true })
//         console.log(user);
//         res.send("User updated successfully")
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })

const connectDB = require('./config/database')
connectDB().then(() =>{
    console.log('Connected to MongoDB');
    app.listen(7777, () => {
    console.log('Server is running on port 7777');
})
});
