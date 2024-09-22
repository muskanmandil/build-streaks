const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const port = 4000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uajhxxn.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0s`;

const jwtKey = process.env.JWT_KEY;
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(dbUri);

app.get("/", (req, res) => {
    res.send("Express app is running");
});

const Users = mongoose.model("Users", {
    name: String,
    email: { type: String, unique: true },
    password: String,
    questionsData: Object,
    streak: Number,
    points: Number,
    lastActiveDate: String,
    activityData: Object
});

const otpSchema = mongoose.Schema({
    email: { type: String, unique: true },
    otp: String,
    expiresAt: Date,
    userData: {
        name: String,
        password: String
    }
});

// Create a TTL(Time-to-Live) index on the expiresAt field
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// OTP Collection
const OTP = mongoose.model("OTP", otpSchema);

// Nodemailer service
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Roadmap Schemas
const questionSchema = new mongoose.Schema({
    question_id: Number,
    title: String,
    level: String,
    lecture_link: String,
    problem_link: String,
    article_link: String
});

const substepSchema = new mongoose.Schema({
    substep_id: Number,
    title: String,
    all_questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const stepSchema = new mongoose.Schema({
    step_id: Number,
    title: String,
    all_substeps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Substep' }],
});

// Create Mongoose Models
const Question = mongoose.model('Question', questionSchema);
const Substep = mongoose.model('Substep', substepSchema);
const Step = mongoose.model('Step', stepSchema);

// GET route to fetch roadmap
app.get('/roadmap', async (req, res) => {
    try {
        // Fetch all steps and populate substeps and questions
        const steps = await Step.find()
            .populate({
                path: 'all_substeps',
                populate: {
                    path: 'all_questions', 
                },
            })
            .exec();

        // Prepare data to send back as response
        const data = steps.map(step => ({
            step_id: step.step_id,
            title: step.title,
            all_substeps: step.all_substeps.map(substep => ({
                substep_id: substep.substep_id,
                title: substep.title,
                all_questions: substep.all_questions.map(question => ({
                    question_id: question.question_id,
                    title: question.title,
                    level: question.level,
                    lecture_link: question.lecture_link,
                    problem_link: question.problem_link,
                    article_link: question.article_link
                }))
            }))
        }));

        res.status(200).json(data);

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

// Signup Route
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res
            .status(400)
            .json({ message: "User with this email already exists" });
    }

    await OTP.findOneAndDelete({ email: req.body.email });

    // Generate a 6-digit OTP & Set expiration time to 10 minutes from now
    const otpGenerated = Math.floor(100000 + Math.random() * 900000);
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

    const otpToHash = otpGenerated.toString();

    bcrypt.hash(otpToHash, saltRounds, async (err, hashOTP) => {
        if (err) {
            return res.status(500).json({ message: "Error while hashing OTP" });
        }

        bcrypt.hash(req.body.password, saltRounds, async (err, hashPassw) => {
            if (err) {
                return res.status(500).json({ message: "Error while hashing password" });
            }

            let newOTP = new OTP({
                email: req.body.email,
                otp: hashOTP,
                expiresAt: expiryTime,
                userData: {
                    name: req.body.name,
                    password: hashPassw,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Build Streaks: Account Verification",
                text: `Your code to verify account is ${otpGenerated}. It is valid till ${expiryTime}.`,
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Failed to send OTP email" });
                }
                await newOTP.save();
                return res.status(200).json({ message: "OTP sent to your email. Please verify." });
            });
        });
    });
});

// Verify Route
app.post("/verify", async (req, res) => {
    const otpRecord = await OTP.findOne({ email: req.body.email });
    if (!otpRecord) {
        return res.status(400).json({ message: "Code Expired" });
    }

    bcrypt.compare(req.body.otp, otpRecord.otp, async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error while comparing OTP" });
        }

        if (!result) {
            return res.status(400).json({ message: "Wrong Code" });
        }

        // OTP verified and deleted
        await OTP.deleteOne({ email: otpRecord.email });

        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            // creating a new data object containing user's id
            const data = {
                user: {
                    id: user.id,
                },
            };

            // generates a json web token using user's id and sending it in response
            const token = jwt.sign(data, jwtKey);
            return res.status(200).json({
                message: "User has been verified successfully",
                token,
                flag: "existingUser",
            });
        } else {
            // default data
            let questionsObj = {};
            for (let i = 0; i < 455; i++) {
                questionsObj[i] = {
                    completed: false,
                    revision: false,
                    note: {
                        status: false,
                        content: "",
                    },
                };
            }

            const date = new Date(Date.now())
                .toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })
                .replace(/\//g, "-");

            // creating a new user
            const newUser = new Users({
                name: otpRecord.userData.name,
                email: otpRecord.email,
                password: otpRecord.userData.password,
                questionsData: questionsObj,
                streak: 0,
                points: 0,
                lastActiveDate: date,
                activityData: [],
            });

            await newUser.save();

            // creating a new data object containing user's id
            const data = {
                user: {
                    id: newUser.id,
                },
            };

            // generates a json web token using user's id and sending it in response
            const token = jwt.sign(data, jwtKey);
            return res.status(200).json({
                message: "User has been registered successfully",
                token,
                flag: "newUser",
            });
        }
    });
});

// Login Route
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error while comapring passwords" });
            }

            if (result) {
                const data = {
                    user: {
                        id: user.id,
                    },
                };

                const token = jwt.sign(data, jwtKey);
                return res.status(200).json({ message: "Logged in successful", token });
            }

            return res.status(400).json({ message: "Wrong password" });
        });
    } else {
        return res.status(400).json({ message: "No user found with this email. Signup first" });
    }
});

// Forgot Password
app.post("/forgot-password", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {

        // Generate a 6-digit OTP & Set expiration time to 10 minutes from now
        const otpGenerated = Math.floor(100000 + Math.random() * 900000);
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

        const otpToHash = otpGenerated.toString();

        bcrypt.hash(otpToHash, saltRounds, async (err, hashOTP) => {
            if (err) {
                return res.status(500).json({ message: "Error while hashing OTP" });
            }

            let newOTP = new OTP({
                email: req.body.email,
                otp: hashOTP,
                expiresAt: expiryTime,
                userData: {
                    name: user.name,
                    password: user.password,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Build Streaks: Account Verification",
                text: `Your code to verify account is ${otpGenerated}. It is valid till ${expiryTime}.`,
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Failed to send OTP email" });
                }
                await newOTP.save();
                return res.status(200).json({ message: "OTP sent to your email. Please verify." });
            });
        });
    } else {
        return res.status(400).json({ message: "No user found with this email. SIgnup first" });
    }
});

// MIDDLEWARE: used for authentication
// next: a fucntion to call the next middleware in chain
const fetchUser = async (req, res, next) => {

    // retrieves value of auth-token header from request, to pass jwt for authentication
    const token = req.header("auth-token");

    // if token is not present or empty string
    if (!token) {
        // sending a unauthorized request(401) response of invalid token
        return res.status(401).json({ message: "Please authenticate using a valid token" });
    }

    try {
        // verify it with secret key
        const data = jwt.verify(token, jwtKey);

        // set the user property of data to the user property of request
        req.user = data.user;

        // move to next middleware function in chain
        next();
    } catch (error) {
        res.status(401).json({ message: "Please authenticate using a valid token" });
    }
};

// New Password
app.post("/new-password", fetchUser, async (req, res) => {
    bcrypt.hash(req.body.new_password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Error while hashing password" });
        }

        await Users.findOneAndUpdate({ _id: req.user.id }, { password: hash });
        return res.status(200).json({ message: "Password changed successfully" });
    });
});

// User info Route
app.post("/user-info", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });
    return res.status(200).json({
        name: user.name,
        email: user.email,
    });
});

// Function for calculating days diff
const calculateDaysDiff = (date1, date2) => {
    // Parse the date strings into Date objects
    const d1 = new Date(
        `${date1.slice(6, 10)}-${date1.slice(3, 5)}-${date1.slice(0, 2)}`
    );
    const d2 = new Date(
        `${date2.slice(6, 10)}-${date2.slice(3, 5)}-${date2.slice(0, 2)}`
    );

    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());

    // Convert the time difference from milliseconds to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};

// Progress Info Route
app.post("/progress-info", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    let currDate = new Date(Date.now())
        .toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .replace(/\//g, "-");
    let daysDiff = calculateDaysDiff(currDate, user.lastActiveDate);
    if (daysDiff > 1) {
        user.streak = 0;
    }

    await Users.findOneAndUpdate({ _id: req.user.id }, { streak: user.streak });

    res.status(200).json({
        questionsData: user.questionsData,
        streak: user.streak,
        points: user.points,
        lastActiveDate: user.lastActiveDate,
        activityData: user.activityData,
    });
});

//  Question done Route
app.post("/question-done", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].completed = true;
    user.streak = req.body.streak;
    user.points = req.body.points;
    user.lastActiveDate = req.body.lastActiveDate;
    user.activityData = req.body.activityData;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
            questionsData: user.questionsData,
            points: user.points,
            streak: user.streak,
            lastActiveDate: user.lastActiveDate,
            activityData: user.activityData,
        }
    );
    return res.status(200).json({ message: "Question mark as completed" });
});

// Question undo Route
app.post("/question-undo", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].completed = false;
    user.points = req.body.points;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData, points: user.points }
    );
    return res.status(200).json({ message: "Question mark as uncompleted" });
});

// Add to Revision Route
app.post("/add-to-revision", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].revision = true;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Question added to revision" });
});

// Remove from Revision route
app.post("/remove-from-revision", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].revision = false;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Question removed from revision" });
});

//  Add Note Route
app.post("/add-note", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].note.status = true;
    user.questionsData[req.body.questionId].note.content = req.body.content;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Note added/edited for Question" });
});

// Delete Note Route
app.post("/delete-note", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].note.status = false;
    user.questionsData[req.body.questionId].note.content = "";

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Note removed from question" });
});

// Leaderboard Route
app.get("/leaderboard", fetchUser, async (req, res) => {
    const users = await Users.find(
        {},
        { name: 1, email: 1, points: 1, streak: 1 }
    )
        .sort({ points: -1, streak: -1, name: 1 })
        .exec();

    const leaderboard = users.map((user, index) => ({
        rank: index + 1,
        name: user.name,
        email: user.email,
        points: user.points,
        streak: user.streak,
    }));

    return res.status(200).json(leaderboard);
});

// Change Password Route
app.post("/change-password", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    bcrypt.compare(req.body.curr_password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error while comparing passwords" });
        }

        if (!result) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        bcrypt.hash(req.body.new_password, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ message: "Error while hashing new password" });
            }

            await Users.findOneAndUpdate({ _id: req.user.id }, { password: hash });
            return res.status(200).json({ message: "Password Updated" });
        });
    });
});

// Delete Account Route
app.post("/delete-account", fetchUser, async (req, res) => {
    await Users.findOneAndDelete({ _id: req.user.id });
    return res.status(200).json({ message: "Account deleted successfully" });
});

// starting app by listening to the port we declared
app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on port : " + port);
    } else {
        console.log("Error : " + error);
    }
});
