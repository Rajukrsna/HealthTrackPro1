const express = require('express');
const router = express.Router();
const Nutrition = require('../models/Nutrition');
const Habit = require('../models/habit');
const Health = require('../models/health');
// Make sure the user is authenticated before proceeding
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/login'); // Redirect to login if the user is not authenticated
    }
    next(); // Proceed to the next middleware or route handler if authenticated
  });

router.get('/', async (req, res) => {
    try {
        
         
        const habits = await Habit.find();  // Get all habits
        const nutritionData = await Nutrition.find();  // Get all nutrition data
        const userGoalCalories = 7000; 
        // Calculate total calories consumed
        const healthProblems = await Health.find();
        
        // Optionally, get any other data like health problems (assuming you have that model)
        // Example: const healthProblems = await HealthProblem.find(); // If needed
        
        // Render the dashboard and pass the necessary data
        res.render('dashboard', {
            habits,
            // Pass the total calories to the template
            userGoalCalories,
            nutritionData,
            healthProblems,
            // Pass nutrition data if needed for detailed views
            // Add any other data you want to display (e.g., healthProblems)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
