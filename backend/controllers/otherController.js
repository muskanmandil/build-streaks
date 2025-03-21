const Users = require('../models/Users');
const Step = require('../models/Step');
const Substep = require('../models/Substep');
const Question = require('../models/Question');

const getRoadmap = async (req, res) => {
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
}



const getLeaderboard = async (req, res) => {
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
}

module.exports = {getRoadmap, getLeaderboard}