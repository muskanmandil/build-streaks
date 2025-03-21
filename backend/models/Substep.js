const mongoose = require('mongoose');
const substepSchema = new mongoose.Schema({
    substep_id: Number,
    title: String,
    all_questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const Substep = mongoose.model('Substep', substepSchema);

module.exports = Substep;