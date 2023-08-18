//Using helmet for security
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require('helmet');

// <-------- For chats --------->

// const io = require('socket.io')(app);

// var usp = io.of('/user-namspace');

// usp.on('connection', socket => {
//     console.log("User Connected");

//     socket.on('disconnect', () => {
//         console.log("User Disconnected");
//     })
// })


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reelRoutes = require('./routes/reelRoutes');
const reelCommentRoutes = require('./routes/reelCommentRoutes');

// <----- Adding chat routes------>
const chatRoutes = require('./routes/chatRoutes');

//Cloudinary set up
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = 3000;

//Adding helmet for security of api
app.use(helmet());

//Connected to Mongoose database and server
mongoose.connect(process.env.mongo_uri, { useUnifiedTopology: true })
    .then((result) => {
        app.listen(PORT, () => { console.log(`Connected to server ${PORT} and database `) });
    })
    .catch((err) => { console.log(err) });


// < ----- For Sign - Up, Login Page and Chat Feature----->
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.json());


app.use(fileUpload({ useTempFiles: true }));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/comments", commentRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/reels/comments", reelCommentRoutes);


// <---- Add Chat Routes------>
app.use("/api/chat", chatRoutes);


app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
})



