const Users = require('../models/Users');

const questionDone = async (req, res) => {
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
}

const questionUndo = async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].completed = false;
    user.points = req.body.points;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData, points: user.points }
    );
    return res.status(200).json({ message: "Question mark as uncompleted" });
}

const addToRevision = async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].revision = true;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Question added to revision" });
}

const removeFromRevision = async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].revision = false;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Question removed from revision" });
}

const addNote = async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].note.status = true;
    user.questionsData[req.body.questionId].note.content = req.body.content;

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Note added/edited for Question" });
}

const deleteNote = async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });

    user.questionsData[req.body.questionId].note.status = false;
    user.questionsData[req.body.questionId].note.content = "";

    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { questionsData: user.questionsData }
    );
    return res.status(200).json({ message: "Note removed from question" });
}

module.exports = { questionDone, questionUndo, addToRevision, removeFromRevision, addNote, deleteNote }