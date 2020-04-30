const validator = require('validator');
const mongoose = require('mongoose');

function validateFetchAdminSession(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if(!data.email) errorJSON.message.push('Email is required.');
    if(!data.password) errorJSON.message.push('Password is required.');
    if(!(
        (typeof data.email === 'string') &&
        validator.isEmail(data.email)
    )) errorJSON.message.push('Email is invalid.');
    if(!(
        (typeof data.password === 'string') &&
        (data.password.length >= 8) &&
        data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    )) errorJSON.message.push('Password is invalid.');
    
    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

function validateToggleUserActive(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if (!data._id) errorJSON.message.push('User Id is required.');
    if (!mongoose.Types.ObjectId.isValid(data._id)) errorJSON.message.push('User Id is invalid.');
    if (data.isActive === undefined) errorJSON.message.push('isActive is required.');
    if (typeof data.isActive !== 'boolean') errorJSON.message.push('isActive is invalid.');
    
    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

function validateCreateUserSession(data) {
    const errorJSON = {
        status: false,
        message: [],
    };

    if (!data) errorJSON.message.push('User Id is required.');
    if (!mongoose.Types.ObjectId.isValid(data)) errorJSON.message.push('User Id is invalid.');
    
    if(errorJSON.message.length) {
        errorJSON.status = true;
        errorJSON.message = errorJSON.message.join('\n');
    }

    return errorJSON;
}

module.exports = {
    validateFetchAdminSession,
    validateToggleUserActive,
    validateCreateUserSession
};