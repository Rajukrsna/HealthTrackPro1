const express = require('express');
const router = express.Router();
const Nutrition = require('../models/nutrition');

// Track nutrition intake
router.get('/track', (req, res) => {
  res.render('track-nutrition');
});

router.post('/track', async (req, res) => {
  const { calories, protein, carbs, fats } = req.body;
  const newNutrition = new Nutrition({ calories, protein, carbs, fats });
  await newNutrition.save();
  res.redirect('/nutrition/track');
});

module.exports = router;
