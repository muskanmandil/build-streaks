const express = require('express');
const fetchUser = require('../middlewares/auth');
const { getRoadmap, getLeaderboard } = require('../controllers/otherController');
const router = express.Router();

router.get('/roadmap', getRoadmap);
router.get('/leaderboard', fetchUser, getLeaderboard);

module.exports = router;