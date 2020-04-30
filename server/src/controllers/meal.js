const {
    validateAddMeal,
    validateUpdateMeal,
    validateDeleteMeal,
    validateFetchMeal
} = require('../validations/meal');
const {
    saveMealTransaction,
    updateMealTransaction,
    deleteMealTransaction,
    fetchMealTransaction
} = require('../transactions/meal.transactions');

async function addMeal(req, res, next) {
    const userId = req.metaData._id;
    const mealData = req.body;
    const errorJSON = validateAddMeal(mealData);

    if(errorJSON.status) {
        console.error('Failure in validate addMeal().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }

    console.info('Successfully validate addMeal().');

    const savedResult = await saveMealTransaction(mealData, userId);

    if(!savedResult) {
        console.error('Failure in transacting addMeal().');
        return res.status(400).json({
            success: false,
            message: 'Failed in saving meal.',
        });
    }
    console.info('Successfully saved Meal() : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function updateMeal(req, res, next) {
    const userId = req.metaData._id;
    const mealData = req.body;
    const errorJSON = validateUpdateMeal(mealData);

    if(errorJSON.status) {
        console.error('Failure in validate updateMeal().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }

    console.info('Successfully validate updateMeal().');

    const savedResult = await updateMealTransaction(mealData, userId);

    if(!savedResult) {
        console.error('Failure in transacting updateMeal().');
        return res.status(400).json({
            success: false,
            message: 'Failed in updating meal.',
        });
    }
    console.info('Successfully updated Meal() : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function deleteMeal(req, res, next) {
    const userId = req.metaData._id;
    const mealId = req.params.mealId;
    const errorJSON = validateDeleteMeal(mealId);

    if(errorJSON.status) {
        console.error('Failure in validate deleteMeal().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }

    console.info('Successfully validate deleteMeal().');

    const savedResult = await deleteMealTransaction(mealId, userId);

    if(!savedResult) {
        console.error('Failure in transacting deleteMeal().');
        return res.status(400).json({
            success: false,
            message: 'Failed in deleting meal.',
        });
    }
    console.info('Successfully deleted Meal() : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: mealId,
    });
}

async function fetchMeal(req, res, next) {
    const userId = req.metaData._id;
    const mealDateRange = {
        min: req.query.minRange,
        max: req.query.maxRange
    };
    const errorJSON = validateFetchMeal(mealDateRange);

    if(errorJSON.status) {
        console.error('Failure in validate fetchMeal().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }

    console.info('Successfully validate fetchMeal().');

    const savedResult = await fetchMealTransaction(mealDateRange, userId);

    if(!savedResult) {
        console.error('Failure in transacting fetchMeal().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching meal.',
        });
    }
    console.info('Successfully fetched Meal() : ', savedResult.length);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

module.exports = {
    addMeal,
    updateMeal,
    deleteMeal,
    fetchMeal,
};