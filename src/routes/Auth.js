const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// 2. FIX: Changed path to be unique
router.post('/request-otp', async (req, res) => { 
  const {enteredName, identifier } = req.body;
  console.log('hiii', enteredName, identifier)
  if (!identifier) {
    return res.status(400).json({ message: 'Please provide an email or phone number.' });
  }

  const isEmail = identifier.includes('@');
  
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // 3. FIX: Corrected the findOneAndUpdate syntax
    const user = await User.findOneAndUpdate(
      { identifier: identifier }, // The query to find the user
      { 
        $set: { // Fields to update every time
          otp: otp,
          otpExpires: otpExpires,
          name: enteredName // Update name if provided
        },
        $setOnInsert: { // Fields to set ONLY when a new user is created
          userId: identifier, // Generate a unique userId on creation
          identifier: identifier
        }
      },
      { upsert: true, new: true, runValidators: true } // The options
    );

    if (isEmail) {
      await transporter.sendMail({
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to: user.identifier,
        subject: 'Your Verification Code',
        text: `Your login code is: ${otp}`,
      });
    } else {
      await twilioClient.messages.create({
        body: `Your verification code is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${user.identifier}`,
      });
    }

    res.status(200).json({ message: 'Verification code sent successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending verification code.', error: error.message });
  }
});


// 4. FIX: Changed path to be unique
router.post('/verify-otp', async (req, res) => {
      const {identifier, otp } = req.body;

    if (!identifier || !otp) {
        return res.status(400).json({ message: 'Identifier and OTP are required.' });
    }

    try {
        // 1. Find the user in the database
        const user = await User.findOne({ identifier: identifier });

        // 2. Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please try signing up again.' });
        }

        // 3. Check if the OTP is correct and not expired
        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired code. Please try again.' });
        }

        // 4. Clear the OTP fields in the database for security
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        // 5. (Standard Practice) Generate a JWT to manage the user's session
        // const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log(user)
        res.status(200).json({ 
            message: 'Login successful!', 
            // token: token, // Send the token back to the client
            user: {
                userId: user.userId,
                name: user.name,
                identifier: user.identifier,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during verification.' });
    }
});


module.exports = router;