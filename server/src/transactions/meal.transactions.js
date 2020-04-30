const Meal = require('../models/meal.model');

async function saveMealTransaction(data, userId) {
    try {
        const result = await Meal.create({
            mealName: data.mealName,
            mealCalories: data.mealCalories,
            mealDate: data.mealDate,
            user: userId,
        });

        if(!result) {
            console.error('Failure in saveMealTransaction().');
            return null;
        }
        console.info('Successfully executed saveMealTransaction() : ', !!result);
        return result && result.toJSON();
    } catch (error) {
        console.error('Failure in saveMealTransaction() : ', error);
        return null;
    }
}

async function updateMealTransaction(data, userId) {
    try {
        const result = await Meal.findOneAndUpdate({
            _id: data._id,
            user: userId
        },{
            mealName: data.mealName,
            mealCalories: data.mealCalories,
            mealDate: data.mealDate,
        }, {
            new: true
        });

        if(!result) {
            console.error('Failure in updateMealTransaction().');
            return null;
        }
        console.info('Successfully executed updateMealTransaction() : ', !!result);
        return result && result.toJSON();
    } catch (error) {
        console.error('Failure in updateMealTransaction() : ', error);
        return null;
    }
}

async function deleteMealTransaction(data, userId) {
    try {
        const result = await Meal.deleteOne({
            _id: data,
            user: userId
        });

        if(!result) {
            console.error('Failure in deleteMealTransaction().');
            return null;
        }
        console.info('Successfully executed deleteMealTransaction() : ', !!result);
        return result && result.ok;
    } catch (error) {
        console.error('Failure in deleteMealTransaction() : ', error);
        return null;
    }
}

async function fetchMealTransaction(dateRange, userId) {
    try {
        const result = await Meal.find({
            user: userId,
            mealDate: {
                $gte: dateRange.min,
                $lte: dateRange.max,
            }
        }).sort({ mealDate: -1 });

        if(!Array.isArray(result)) {
            console.error('Failure in fetchMealTransaction().');
            return null;
        }
        console.info('Successfully executed fetchMealTransaction() : ', result && result.length);
        return result && result.map(e => e.toJSON());
    } catch (error) {
        console.error('Failure in fetchMealTransaction() : ', error);
        return null;
    }
}

module.exports = {
    saveMealTransaction,
    updateMealTransaction,
    deleteMealTransaction,
    fetchMealTransaction,
};