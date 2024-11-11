const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    calories:Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    date:{ type: Date, default: Date.now},
});

module.exports = mongoose.model('Nutrition', nutritionSchema)