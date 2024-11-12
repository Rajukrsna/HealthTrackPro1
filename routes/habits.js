const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Display habits
router.get('/', async (req, res) => {
  const habits = await Habit.find();
  const selectedDate = new Date().getDate();
  res.render('display-habits', { habits,selectedDate });
});

// Add a new habit
router.get('/add', (req, res) => {
  res.render('add-habit');
});

router.post('/add', async (req, res) => {
  const { habitName, goal } = req.body;
  const newHabit = new Habit({ habitName, goal });
  await newHabit.save();
  res.redirect('/habits');
});

// Mark habit as completed
router.post('/complete/:id', async (req, res) => {
  await Habit.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect('/habits');  //used to keep the tracked habits alive in the main page
  //it is redirecting to /habits, and not the ejs file.
});
router.post('/delete/:id' , async(req,res)=>{
  await Habit.findByIdAndDelete(req.params.id);
  res.redirect('/habits')

});


// Route to display habits for a specific date or today's date by default
router.get('/date/:date?', async (req, res) => {
  try {
    // If a date is provided, use it; otherwise, use today's date
    let selectedDate;
    if (req.params.date) {
      // Construct a full date string with the current year and month
      const currentYear = new Date().getFullYear();
      const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
      const day = String(req.params.date).padStart(2, '0');
      selectedDate = `${currentYear}-${currentMonth}-${day}`;
    } else {
      // Use today's date in YYYY-MM-DD format
      selectedDate = new Date().toISOString().split('T')[0];
    }

    // Query the habits based on the full date string in 'YYYY-MM-DD' format
    const habits = await Habit.find({
      date: {
        $gte: new Date(selectedDate),
        $lt: new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1))
      }
    });

    res.render('display-habits', {
      habits,
      selectedDate
    });
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).send("An error occurred while fetching habits.");
  }
});

module.exports = router;
