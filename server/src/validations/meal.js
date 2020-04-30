const moment = require('moment');
const mongoose = require('mongoose');

function validateAddMeal(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if(!data.mealName) errorJSON.message.push('Meal Name is required.');
    if(typeof data.mealName !== 'string') errorJSON.message.push('Meal Name is invalid.');
    if(!data.mealCalories) errorJSON.message.push('Meal Calories is required.');
    if(typeof data.mealCalories !== 'number') errorJSON.message.push('Meal Calories is invalid.');
    if(!data.mealDate) errorJSON.message.push('Meal Date is required.');
    if(typeof data.mealDate !== 'string') errorJSON.message.push('Meal Date is invalid.');
    if(!moment(data.mealDate, 'YYYY/MM/DD', true).isValid()) errorJSON.message.push('Meal Date is invalid.');
    
    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    } else 
        errorJSON.message = errorJSON.message.join('\n');

    return errorJSON;
}

function validateUpdateMeal(data) {
    const errorJSON = validateAddMeal(data);
    errorJSON.message = [errorJSON.message];

    if(!data._id) errorJSON.message.push('Meal Id is required.');
    if(!mongoose.Types.ObjectId.isValid(data._id)) errorJSON.message.push('Meal Id is invalid.');
    

    errorJSON.message = errorJSON.message.filter(e => e || undefined);

    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

function validateDeleteMeal(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if(!data) errorJSON.message.push('Meal Id is required.');
    if(!mongoose.Types.ObjectId.isValid(data)) errorJSON.message.push('Meal Id is invalid.');
    
    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

function validateFetchMeal(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if(!data) errorJSON.message.push('Meal Date Range is required.');
    if(typeof data !== 'object') errorJSON.message.push('Meal Date Range is invalid.');
    else {
        if(!data.min) errorJSON.message.push('Meal Date Min Range is required.');
        if(typeof data.min !== 'string') errorJSON.message.push('Meal Date Min Range is invalid.');
        if(!moment(data.min, 'YYYY/MM/DD', true).isValid()) errorJSON.message.push('Meal Date Min Range is invalid.');

        if(!data.max) errorJSON.message.push('Meal Date Max Range is required.');
        if(typeof data.max !== 'string') errorJSON.message.push('Meal Date Max Range is invalid.');
        if(!moment(data.max, 'YYYY/MM/DD', true).isValid()) errorJSON.message.push('Meal Date Max Range is invalid.');
    }
    
    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

module.exports = {
    validateAddMeal,
    validateUpdateMeal,
    validateDeleteMeal,
    validateFetchMeal,
};