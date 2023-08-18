const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;

router.use(express.json());
router.use(cookieParser());
dotenv.config();
//This file will export the signup and login function to authRoutes

const signup_get =
    (req, res) => {
        // res.send('User Signup Page');
        try {
            res.render('signup')
        } catch (error) {
            console.log(error);
        }
    }

const login_get =
    (req, res) => {
        res.render('login')
    }

const signup_post =
    async (req, res) => {
        // console.log(req);
        try {
            //getting data from the body
            const { name, username, email, password, bio } = req.body;

            //all data is required required*
            if (!name || !username || !email || !password)
                res.status(400).send('All fields are required');


            //verify if user already exists, using email
            const checkExistingUser = await User.findOne({ email });
            if (checkExistingUser)
                res.status(400).send('User Already Exists');

            else {

                //encrypt password 
                const hashedPassword = await bcrypt.hash(password, 10);

                //Create New User
                //if user has provided an image
                if (req.files) {
                    const file = req.files.image;
                    //Adding images using cloudinary
                    let img_url = "";
                    await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                        img_url = result.url;
                    })

                    var newUser = await User.create({
                        name,
                        image: img_url,
                        username,
                        bio,
                        email,
                        password: hashedPassword
                    })
                }

                //else show default image
                else {
                    var newUser = await User.create({
                        name,
                        username,
                        bio,
                        email,
                        password: hashedPassword
                    })
                }
                //generate token
                var token = jwt.sign({ id: newUser._id }, process.env.secret_key, { expiresIn: "2h" });
                newUser.token = token;
                //Setting password to undefined
                newUser.password = undefined;

                res.status(200).json(newUser);
                // res.render('signup', { success: 'Sign Up successful' })
            }
        }

        catch (err) {
            console.log(err);
        }
    }

const login_post =
    async (req, res) => {
        try {
            //getting data from body
            const { email, password } = req.body;
            if (!email || !password)
                res.status(400).send('All fields required');
            //check if user exists in database
            const loggedInUser = await User.findOne({ email })


            //verify the entered password from the user.password
            if (loggedInUser && (await bcrypt.compare(password, loggedInUser.password))) {
                //if verified, create and send a token
                const token = jwt.sign({ id: loggedInUser._id }, process.env.secret_key, { expiresIn: "2h" });
                loggedInUser.token = token;
                loggedInUser.password = undefined;

                //send token to user cookie
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    //Only server can manipulate this cookie
                    httpOnly: true
                }
                res.status(200).cookie("token", token, options).json({
                    success: true,
                    loggedInUser
                })
            }

            else if (!loggedInUser)
                res.status(401).send('Please Sign in first');

            else
                res.status(402).send('Wrong Password');
        }

        catch (err) {
            console.log(err);
        }
    }

module.exports = { signup_get, login_get, signup_post, login_post };




