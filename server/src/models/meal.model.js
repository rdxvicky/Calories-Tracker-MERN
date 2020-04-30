const mongoose = require ('mongoose');

var mealSchema = mongoose.Schema({
    mealName: {
        type: String,
        require: true,
    },
    mealCalories: {
        type: Number,
        default: 0.0,
        require: true,
    },
    mealDate: {
        type: String,
        require: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        index: true,
    },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
