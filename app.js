const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const app = express();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("MongoDB connected")).catch(err => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const habitRoutes = require('./routes/habits');
const nutritionRoutes = require('./routes/nutrition');
const statsRoutes = require('./routes/statistics');

// Routes
app.use('/habits', habitRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/statistics', statsRoutes);

// Home Route
app.get('/', (req, res) => res.redirect('/habits'));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
