const Users = require('../models/Users');
const { calculateDaysDiff } = require('../utils/daysDiff');

const userInfo = async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });
    return res.status(200).json({
        name: user.name,
        email: user.email,
    });
}

const progressInfo = async (req, res) => {
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
}

module.exports = { userInfo, progressInfo }