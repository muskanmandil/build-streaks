// Importing necessary packages
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();

// Database variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Declaring the port
const port = 4000;

// Creating app instance, and using necessary packages for app
const app = express();
app.use(express.json());
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.send("Express app is running");
})

// Connecting with database
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0s`);

// Creating Users Schema
const Users = mongoose.model("Users", {
    name: String,
    email: { type: String, unique: true },
    password: String,
    questionsData: Object,
    streak: Number,
    points: Number,
    lastActiveDate: String,
    date: Date
})

// Signup Route
app.post('/signup', async (req, res) => {

    // checking if user already exists 
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        res.status(400).json({ message: "User with this email already exists" });
    }
    else {
        // default data
        let questionsObj = {};
        for (let i = 0; i < 455; i++) {
            questionsObj[i] = {
                completed: false,
                revision: false,
                note: {
                    status: false,
                    content: ""
                }
            };
        }

        // creating a new user
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            questionsData: questionsObj,
            streak: 0,
            points: 0,
            lastActiveDate: new Date(Date.now()).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-')
        })
        await user.save();

        // creating a new data object containing user's id 
        const data = {
            user: {
                id: user.id
            }
        }

        // generates a json web token using user's id and sending it in response
        const token = jwt.sign(data, "secret_key");
        res.status(200).json({ message: "User has been registered successfully", token });
    }
})


// Login Route
app.post('/login', async (req, res) => {

    // checking if user exists or not
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        // checking passwords
        let passwCompare = user.password === req.body.password
        if (passwCompare) {

            // if passwords matches then creating a new data object containing user's id 
            const data = {
                user: {
                    id: user.id
                }
            }

            // generates a json web token using user's id and sending response
            const token = jwt.sign(data, 'secret_key');
            res.status(200).json({ message: "Logged in successful", token })
        }
        else {
            res.status(400).json({ message: "Wrong password" });
        }
    }
    else {
        res.status(400).json({ message: "No user found with this email. Signup first" });
    }
})

// MIDDLEWARE: used for authentication
// next: a fucntion to call the next middleware in chain
const fetchUser = async (req, res, next) => {

    // retrieves value of auth-token header from request, to pass jwt for authentication
    const token = req.header('auth-token');

    // if token is not present or empty string
    if (!token) {
        // sending a unauthorized request(400) response of invalid token
        res.status(401).json({ message: "Please authenticate using a valid token" });
    }
    else {
        // if token is present 
        try {
            // then verify it with secret key
            const data = jwt.verify(token, 'secret_key');

            // set the user property of data to the user property of request
            req.user = data.user;

            // move to next middleware function in chain
            next();
        }

        //  if any error occurs it is catched
        catch (error) {
            res.status(401).json({ message: "Please authenticate using a valid token" });
        }
    }
}

// User info Route
app.post('/userinfo', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });
    res.status(200).json({
        name: user.name,
        email: user.email
    })
})


// Function for calculating days diff
const calculateDaysDiff = (date1, date2) => {

    // Parse the date strings into Date objects
    const d1 = new Date(`${date1.slice(6, 10)}-${date1.slice(3, 5)}-${date1.slice(0, 2)}`);
    const d2 = new Date(`${date2.slice(6, 10)}-${date2.slice(3, 5)}-${date2.slice(0, 2)}`);

    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());

    // Convert the time difference from milliseconds to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff;
};

// Progress info Route 
app.post('/progressinfo', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    let currDate = new Date(Date.now()).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    let daysDiff = calculateDaysDiff(currDate, user.lastActiveDate);
    if (daysDiff > 1) {
        user.streak = 0;
    }

    await Users.findOneAndUpdate({ _id: req.user.id }, { streak: user.streak });

    res.status(200).json({
        questionsData: user.questionsData,
        streak: user.streak,
        points: user.points,
        lastActiveDate: user.lastActiveDate
    })
})

//  Question done Route
app.post('/questiondone', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].completed = true;
    user.streak = req.body.streak;
    user.points = req.body.points;
    user.lastActiveDate = req.body.lastActiveDate;

    await Users.findOneAndUpdate({ _id: req.user.id }, { questionsData: user.questionsData, points: user.points, streak: user.streak, lastActiveDate: user.lastActiveDate });

    res.status(200).json({ message: "Question mark as completed" });
});

// Question undo Route
app.post('/questionundo', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].completed = false;
    user.points = req.body.points;

    await Users.findOneAndUpdate({ _id: req.user.id }, { questionsData: user.questionsData, points: user.points });

    res.status(200).json({ message: "Question mark as uncompleted" });
});

// Add to Revision Route
app.post('/addToRevision', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].revision = true;

    await Users.findOneAndUpdate({ _id: req.user.id }, { questionsData: user.questionsData });

    res.status(200).json({ message: "Question added to revision" });
});

// Remove from Revision route
app.post('/removeFromRevision', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].revision = false;

    await Users.findOneAndUpdate({ _id: req.user.id }, { questionsData: user.questionsData });

    res.status(200).json({ message: "Question removed from revision" });
});

//  Add Note Route
app.post('/addNote', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].note.status = true;
    user.questionsData[req.body.questionId].note.content = req.body.content;

    await Users.findOneAndUpdate({ _id: req.user.id }, { questionsData: user.questionsData });

    res.status(200).json({ message: "Note added to Question" });
});

// Delete Note Route
app.post('/deleteNote', fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].note.status = false;
    user.questionsData[req.body.questionId].note.content = "";

    await Users.findOneAndUpdate({ _id: req.user.id }, { questionsData: user.questionsData });

    res.status(200).json({ message: "Note removed from question" });
});

// Leaderboard Route
app.get('/leaderboard', fetchUser, async (req, res) => {

    const users = await Users.find({}, { name: 1, email: 1, points: 1, streak: 1 })
        .sort({ points: -1, streak: -1, name: 1 })
        .exec();

    const leaderboard = users.map((user, index) => ({
        rank: index + 1,
        name: user.name,
        email: user.email,
        points: user.points,
        streak: user.streak,
    }));

    res.status(200).json(leaderboard);
});

// starting app by listening to the port we declared
app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on port : " + port);
    } else {
        console.log("Error : " + error);
    }
})