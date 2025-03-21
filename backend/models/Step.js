const mongoose = require('mongoose');
const stepSchema = new mongoose.Schema({
    step_id: Number,
    title: String,
    all_substeps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Substep' }],
});

const Step = mongoose.model('Step', stepSchema);

module.exports = Step;