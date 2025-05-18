const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Create a new order (any authenticated user)
router.post('/', protect, orderController.createOrder);

// Get all orders (admin only)
router.get('/', protect, admin, orderController.getOrders);

// Get current user's orders
router.get('/my-orders', protect, orderController.getMyOrders);

// Get order by ID
router.get('/:id', protect, orderController.getOrderById);

// Update order to paid
router.put('/:id/pay', protect, orderController.updateOrderToPaid);

// Update order to delivered (admin only)
router.put('/:id/deliver', protect, admin, orderController.updateOrderToDelivered);

// Delete order (admin only)
router.delete('/:id', protect, admin, orderController.deleteOrder);

module.exports = router;