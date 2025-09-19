const mongoose = require('mongoose');
const { type } = require('os');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  userId: {
    type: String,
    unique: true,
  },
  identifier: {
    type: String,
    required: [true, 'Please provide an email or phone number.'],
    unique: true,
    // A simple regex to match either an email or a 10-digit phone number
    match: [/^(?:\d{10}|\w+@\w+\.\w{2,3})$/, 'Please provide a valid email or 10-digit phone number.'],
    trim: true,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);