const axios = require('axios');
const express = require('express');
const router = express.Router();
const Health = require('../models/health');

// Route to render the symptom logging form
router.get('/analysis', (req, res) => {

  res.render('symptom'); // Render the initial form without data
});
// Route to handle the form submission and save health issue and symptoms
router.post('/analysis', async (req, res) => {
    const { healthIssue, symptoms } = req.body;
  
    try {
      // Save the health issue and symptoms to the database
      const healthRecord = new Health({
        healthIssue,
        symptoms,
      });
  
      await healthRecord.save(); // Save to MongoDB
  
      // Send success response or render the page with a success message
      res.render('symptom', {
        message: 'Health issue and symptoms saved successfully!',
      });
    } catch (err) {
      console.error(err);
      res.render('symptom', {
        error: 'An error occurred while saving the data.',
      });
    }
  });
module.exports = router;
