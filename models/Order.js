const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true }, // From your User model
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String,
  }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Placed' },
});

module.exports = mongoose.model('Order', OrderSchema);