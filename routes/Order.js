const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// TODO: Add authentication middleware to protect these routes

// === POST /api/orders/create - Create a new order ===
router.post('/create', async (req, res) => {
  const { items, totalAmount, userId } = req.body;

  try {
    const newOrder = new Order({
      orderId: `order_${uuidv4()}`, // Generate a unique order ID
      userId,
      items,
      totalAmount,
    });
    
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });

  } catch (error) {
    res.status(500).json({ message: 'Failed to create order.', error: error.message });
  }
});

// === GET /api/orders - Fetch user's order history ===
// === GET /api/orders/:userId - Fetch a specific user's order history ===
router.get('/:userId', async (req, res) => {
  // Get the userId from the URL parameter
  const { userId } = req.params; 

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    // Find all orders that match the user's ID
    const orders = await Order.find({ userId: userId }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders.', error: error.message });
  }
});

module.exports = router;