const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Create a new order (requires JWT)
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    const user = req.user; // From auth middleware

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No valid products provided.' 
      });
    }

    // Calculate total and validate products exist
    let totalAmount = 0;
    
    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(404).json({ 
          success: false, 
          message: `Product not found: ${item.product}` 
        });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = new Order({
      products,
      customerName: user.username,
      customerEmail: user.email,
      customerId: user._id,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    // Save order
    await order.save({ session });
    await session.commitTransaction();

    res.status(201).json({ 
      success: true, 
      order,
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create order.' 
    });
  } finally {
    session.endSession();
  }
};

// Get all orders (admin)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('products.product', 'name price')
            .populate('customerId', 'username email');

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Fetch all orders error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching orders.' });
    }
};

// Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.user._id })
            .populate('products.product', 'name price');

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Fetch my orders error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching your orders.' });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('products.product', 'name price')
            .populate('customerId', 'username email');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if the user is admin or the order owner
        if (order.customerId._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ success: false, message: 'Not authorized to view this order' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Fetch order by ID error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching order.' });
    }
};

// Update order to paid
exports.updateOrderToPaid = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(req.params.id).session(session);

        if (!order) {
            await session.abortTransaction();
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if the user is admin or the order owner
        if (order.customerId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            await session.abortTransaction();
            return res.status(401).json({ success: false, message: 'Not authorized to update this order' });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save({ session });
        await session.commitTransaction();

        res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
        await session.abortTransaction();
        console.error('Update order to paid error:', error);
        res.status(500).json({ success: false, message: 'Server error updating order.' });
    } finally {
        session.endSession();
    }
};

// Update order to delivered (admin only)
exports.updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error('Update order to delivered error:', error);
        res.status(500).json({ success: false, message: 'Server error updating order.' });
    }
};

// Delete order (admin only)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        await order.remove();
        res.status(200).json({ success: true, message: 'Order removed' });
    } catch (error) {
        console.error('Delete order error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting order.' });
    }
};