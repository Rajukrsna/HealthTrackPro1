const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Adjust this import path based on your project

module.exports = function(passport) {
  // Passport Local strategy configuration
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',  // If using email as the username
      passwordField: 'password'  // The field for the password
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: 'No user found with that email' });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (err) {
        return done(err);
      }
    }
  ));

  // Serialize user to store user ID in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);  // Using async/await to handle the promise
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
