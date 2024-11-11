const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');
const Nutrition = require('../models/nutrition');

// Display statistics
router.get('/', async (req, res) => {
  // Fetch habit completion stats
  const habits = await Habit.find();
  const completedHabits = habits.filter(habit => habit.completed).length;
  const completionRate = (completedHabits / habits.length) * 100;

  // Fetch nutrition stats
  const nutritionData = await Nutrition.find().sort({ date: -1 }).limit(7); // Last 7 days
  const avgNutrition = nutritionData.reduce((acc, curr) => {
    acc.calories += curr.calories;
    acc.protein += curr.protein;
    acc.carbs += curr.carbs;
    acc.fats += curr.fats;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const days = nutritionData.length;
  for (let key in avgNutrition) {
    avgNutrition[key] = (avgNutrition[key] / days).toFixed(2);
  }

  res.render('statistics', { habits, completionRate, avgNutrition });
});

module.exports = router;
