const Product = require('../models/Product');

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    // Validate required fields
    if (!name || !description || !price || !image) {
      return res.status(400).json({ 
        success: false,
        error: 'Name, description, price and image are required fields' 
      });
    }

    // Validate price is a positive number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Price must be a positive number' 
      });
    }

    // Validate stock if provided
    if (stock && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({ 
        success: false,
        error: 'Stock must be a positive number or zero' 
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category: category || 'uncategorized',
      stock: stock || 0,
    });

    const savedProduct = await newProduct.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct
    });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error while creating product',
      message: error.message 
    });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Optional query parameters for filtering
    const { category, minPrice, maxPrice, name, sort } = req.query;
    let query = {};

    // Build query based on parameters
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    // Sorting options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'name_asc') sortOption = { name: 1 };
    if (sort === 'name_desc') sortOption = { name: -1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .select('-__v'); // Exclude version key

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findById(id).select('-__v');
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      product 
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching product',
      error: error.message 
    });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Validate price if provided
    if (req.body.price && (isNaN(req.body.price) || req.body.price <= 0)) {
      return res.status(400).json({ 
        success: false,
        error: 'Price must be a positive number' 
      });
    }

    // Validate stock if provided
    if (req.body.stock && (isNaN(req.body.stock) || req.body.stock < 0)) {
      return res.status(400).json({ 
        success: false,
        error: 'Stock must be a positive number or zero' 
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error while updating product',
      error: error.message 
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error while deleting product',
      error: error.message 
    });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false,
        message: 'Search query is required' 
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).select('-__v');

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while searching products',
      error: error.message 
    });
  }
};