const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Make sure to replace this with your actual User model
const router = express.Router();

// GET Register Page (Sign Up)
router.get('/register', (req, res) => {
  res.render('register'); // Render the registration form view
});

// POST Register (Sign Up) - Create a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).send('Please fill in all fields');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Redirect the user to the login page after successful registration
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET Login Page (Sign In)
router.get('/login', (req, res) => {
  res.render('login'); // Render the login form view
});

// POST route for login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true,  // Make sure this is enabled
  successFlash: 'Welcome back!'  // Optional: Success message on successful login
}));
// GET Logout - Destroy the session and log the user out
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login'); // Redirect to login page after logout
  });
});

module.exports = router;
