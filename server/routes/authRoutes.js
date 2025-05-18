const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.userLogOut);

// Logged-in user route
router.get('/me', protect, authController.getMe);

module.exports = router;
