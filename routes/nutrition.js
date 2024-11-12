const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const Nutrition = require('../models/Nutrition'); // Adjust path as needed
const router = express.Router();
require('dotenv').config();

const app_id = process.env.AID;
const app_key = process.env.AID2;

// Route to render the form for ingredient input
router.get('/track', async (req, res) => {
  // Fetch the existing nutrition data from MongoDB
  let nutritionEntry = await Nutrition.findOne({});
  res.render('track-nutrition', { nutritionData: nutritionEntry, error: null });
});

const analyzeNutrition = async (ingredients) => {
  try {
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${app_key}`,
      { title: 'Recipe Analysis', ingr: ingredients },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to analyze nutrition data');
  }
};

router.post('/analyze', async (req, res) => {
  const ingredients = req.body.ingredients.split('\n');
  const mealType = req.body.mealType; // Add a field in your form to capture meal type (breakfast, lunch, dinner)

  try {
    const nutritionData = await analyzeNutrition(ingredients);

    // Prepare nutrition data for MongoDB document
    const mealData = {
      food: ingredients.join(', '),
      calories: nutritionData.totalNutrients.ENERC_KCAL.quantity,
      protein: nutritionData.totalNutrients.PROCNT.quantity,
      carbs: nutritionData.totalNutrients.CHOCDF.quantity,
      fats: nutritionData.totalNutrients.FAT.quantity,
    };

    // Fetch or create the user's daily nutrition document
    let nutritionEntry = await Nutrition.findOne({});
    if (!nutritionEntry) {
      nutritionEntry = new Nutrition({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
      });
    }

    // Update the document based on the meal type
    nutritionEntry[mealType] = mealData;

    // Update total nutrients
    nutritionEntry.totalCalories += mealData.calories;
    nutritionEntry.totalProtein += mealData.protein;
    nutritionEntry.totalCarbs += mealData.carbs;
    nutritionEntry.totalFats += mealData.fats;

    // Save to MongoDB
    await nutritionEntry.save();

    res.redirect('/nutrition/track');
  } catch (error) {
    res.redirect('/track', { nutritionData: null, error: 'Failed to analyze and save nutrition data.' });
  }
});

module.exports = router;
