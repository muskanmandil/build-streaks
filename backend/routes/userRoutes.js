const express = require('express');
const { userInfo, progressInfo} = require('../controllers/userController');
const fetchUser = require('../middlewares/auth');
const router = express.Router();

router.post('/info', fetchUser, userInfo);
router.post('/progress', fetchUser, progressInfo);

module.exports = router;