const mongoose = require('mongoose');
const { type } = require('os');

const productSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  artist: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  dimensions: { type: String },
  availableSizes: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  imageGallery: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;