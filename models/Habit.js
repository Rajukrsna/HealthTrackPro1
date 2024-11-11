const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habitName: String,
  goal: Number,
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);
