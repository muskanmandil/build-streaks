const express = require('express');
const { signup, verify, login, forgotPassword, newPassword, changePassword, deleteAccount } = require('../controllers/authController');
const fetchUser = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/verify', verify);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/new-password', fetchUser, newPassword);
router.post('/change-password', fetchUser, changePassword);
router.post('/delete-account', fetchUser, deleteAccount);

module.exports = router;