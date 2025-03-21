const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    question_id: Number,
    title: String,
    level: String,
    lecture_link: String,
    problem_link: String,
    article_link: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;