require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
// 1. Use a simpler, more reliable CORS configuration
app.use(cors({ origin: 'http://localhost:3000' }));

// 2. This middleware is for parsing JSON bodies and should come after CORS
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const productRoutes = require('./routes/ProductRoutes');
app.use('/api/products', productRoutes);
const authRoutes = require('./routes/Auth');
app.use('/api/auth', authRoutes);
const orderRoutes = require('./routes/Order');
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => {
  // 3. Removed the unnecessary res.set() header here
  res.status(200).send('Welcome to root URL of Server');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
});