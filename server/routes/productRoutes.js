const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');

// Public routes (can be accessed without authentication)
router.get('/', getAllProducts); // Get all products with optional filtering
router.get('/search', searchProducts); // Search products
router.get('/:id', getProduct); // Get single product by ID

// Protected routes (should typically require authentication)
router.post('/', createProduct); // Create new product
router.put('/:id', updateProduct); // Update product
router.delete('/:id', deleteProduct); // Delete product

module.exports = router;