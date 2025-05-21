const mongoose = require('mongoose');
const Product = require('../models/Product');
const path = require('path');

// Create new product with image upload
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description || !price || !image) {
      return res.status(400).json({
        success: false,
        error: 'Name, description, price, and image are required'
      });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Price must be a positive number'
      });
    }

    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({
        success: false,
        error: 'Stock must be a non-negative number'
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image, // ✅ full path saved
      category: category || 'uncategorized',
      stock: stock || 0,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct,
    });

  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ success: false, error: 'Server error', message: error.message });
  }
};


// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, name, sort } = req.query;
    const query = {};

    if (category) query.category = category;
    if (name) query.name = { $regex: name, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'name_asc') sortOption = { name: 1 };
    if (sort === 'name_desc') sortOption = { name: -1 };

    const products = await Product.find(query).sort(sortOption).select('-__v');

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

// Get product by ID
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID format' });
  }

  try {
    const product = await Product.findById(id).select('-__v');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Get error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID format' });
  }

  try {
    const { price, stock } = req.body;
    if (price !== undefined && (isNaN(price) || price <= 0)) {
      return res.status(400).json({ success: false, error: 'Price must be a positive number' });
    }

    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({ success: false, error: 'Stock must be a non-negative number' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated', product: updatedProduct });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID format' });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Search query is required' });
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).select('-__v');

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
