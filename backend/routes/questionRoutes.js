const express = require('express');
const { questionDone, questionUndo, addToRevision, removeFromRevision, addNote, deleteNote} = require('../controllers/questionController');
const fetchUser = require('../middlewares/auth');
const router = express.Router();

router.post('/done', fetchUser, questionDone);
router.post('/undo', fetchUser, questionUndo);
router.post('/add-to-revision', fetchUser, addToRevision);
router.post('/remove-from-revision', fetchUser, removeFromRevision);
router.post('/add-note', fetchUser, addNote);
router.post('/delete-note', fetchUser, deleteNote);

module.exports = router;