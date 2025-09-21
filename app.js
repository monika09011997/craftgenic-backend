require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
// 1. Use a simpler, more reliable CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));

// 2. This middleware is for parsing JSON bodies and should come after CORS
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const productRoutes = require('./src/routes/ProductRoutes');
app.use('/api/products', productRoutes);
const authRoutes = require('./src/routes/Auth');
app.use('/api/auth', authRoutes);
const orderRoutes = require('./src/routes/Order');
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => {
  // 3. Removed the unnecessary res.set() header here
  res.status(200).send('Welcome to root URL of Server');
});

// Start server
module.exports = app;