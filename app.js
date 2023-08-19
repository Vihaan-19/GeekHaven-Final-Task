const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const PORT = 3000;
// Adding Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reelRoutes = require('./routes/reelRoutes');
const reelCommentRoutes = require('./routes/reelCommentRoutes');
const communityRoutes = require('./routes/communityRoutes');

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


//Connected to Mongoose database and server
mongoose.connect(process.env.mongo_uri, { useUnifiedTopology: true })
    .then((result) => {
        server.listen(PORT, () => { console.log(`Connected to server ${PORT} and database `) });
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
app.use("/api/community", communityRoutes);


// <---- Add Chat Routes------>
app.use("/api/chat", chatRoutes);


// <-------- For chats --------->
io.on('connection', (socket) => {
    console.log("User Connected");

    socket.on('disconnect', () => {
        console.log("User Disconnected");
    })
})


app.get('/', (req, res) => {
    res.send("Welcome to Home Page");
})




