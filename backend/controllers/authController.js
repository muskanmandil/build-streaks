const Users = require('../models/Users')
const OTP = require('../models/OTP')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/sendEmail')

const saltRounds = 10;

const generateToken = (user) => {
    return jwt.sign({
        user: {
            id: user.id,
        }
    }, process.env.JWT_KEY, { expiresIn: '7d' });
};

const sendOTP = async (email, password, name, res) => {

    // Generating OTP
    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    const otpHash = await bcrypt.hash(otpGenerated, saltRounds);

    const passwordHash = await bcrypt.hash(password, saltRounds);

    let newOTP = new OTP({
        email: email,
        otp: otpHash,
        expiresAt: expiry,
        userData: {
            name: name,
            password: passwordHash,
        },
    });
    await newOTP.save();

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Build Streaks: Account Verification",
        text: `Your code to verify account is ${otpGenerated}. It is valid till ${expiry}.`,
    };  

    await sendEmail(mailOptions);
    return res.status(200).json({ message: "OTP is sent to your email. Please verify your account within 10 minutes" });
};

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    let user = await Users.findOne({ email: email });
    if (user) {
        return res
            .status(400)
            .json({ message: "User with this email already exists" });
    }

    await OTP.findOneAndDelete({ email: email });
    return sendOTP(email, password, name, res);
}

const verify = async (req, res) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email: email });
    if (!otpRecord) {
        return res.status(400).json({ message: "Code Expired" });
    }

    const otpCheck = await bcrypt.compare(otp, otpRecord.otp);
    if (!otpCheck) {
        return res.status(400).json({ message: "Wrong Code" });
    }

    // OTP verified and deleted
    await OTP.deleteOne({ email: otpRecord.email });

    let user = await Users.findOne({ email: email });

    if (user) {
        const token = generateToken(user);
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

        const token = generateToken(newUser);

        return res.status(200).json({
            message: "User has been registered successfully",
            token,
            flag: "newUser",
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await Users.findOne({ email: email });
    if (user) {

        // Checking Password
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
            const token = generateToken(user);
            return res.status(200).json({ message: "Logged in successful", token });
        }
        return res.status(400).json({ message: "Wrong password" });

    } else {
        return res.status(400).json({ message: "No user found with this email. Signup first" });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    let user = await Users.findOne({ email: email });
    if (user) {
        return sendOTP(user.email, user.password, user.name, res);

    } else {
        return res.status(400).json({ message: "No user found with this email. Signup first" });
    }
}

const newPassword = async (req, res) => {
    const { new_password } = req.body;
    const passwordHash = await bcrypt.hash(new_password, saltRounds);
    await Users.findOneAndUpdate({ _id: req.user.id }, { password: passwordHash });
    return res.status(200).json({ message: "Password changed successfully" });
}

const changePassword = async (req, res) => {
    const { curr_password, new_password } = req.body;
    let user = await Users.findOne({ _id: req.user.id });
    const passwordCheck = await bcrypt.compare(curr_password, user.password);
    if (passwordCheck) {
        return res.status(400).json({ message: "Wrong Password" });
    }

    const passwordHash = await bcrypt.hash(new_password, saltRounds);

    await Users.findOneAndUpdate({ _id: req.user.id }, { password: passwordHash });
    return res.status(200).json({ message: "Password Updated" });

}

const deleteAccount = async (req, res) => {
    await Users.findOneAndDelete({ _id: req.user.id });
    return res.status(200).json({ message: "Account deleted successfully" });
}

module.exports = { signup, login, verify, forgotPassword, newPassword, changePassword, deleteAccount };