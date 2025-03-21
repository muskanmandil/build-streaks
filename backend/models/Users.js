const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    questionsData: Object,
    streak: Number,
    points: Number,
    lastActiveDate: String,
    activityData: Object
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;