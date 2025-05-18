const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin-only routes
router.get('/', protect, admin, authController.getAllUsers);
router.get('/:id', protect, admin, authController.getUser);
router.put('/:id', protect, admin, authController.updateUser);
router.delete('/:id', protect, admin, authController.deleteUser);

module.exports = router;
