const uuid = require('uuid');
const moment = require('moment');
const User = require('../models/user.model');
const { setNodeCache } = require('../middlewares/cachingModule');

async function fetchAllUsersTransaction(dateRange, user = null) {
    try {
        const result = await User.find({}, {
            userName: 1,
            userEmail: 1,
            isActive: 1,
            expectedPerDayIntakeCalorie: 1
        });

        if(!Array.isArray(result)) {
            console.error('Failure in fetchAllUsersTransaction().');
            return null;
        }
        console.info('Successfully executed fetchAllUsersTransaction() : ', result && result.length);
        return result && result.map(e => e.toJSON());
    } catch (error) {
        console.error('Failure in fetchAllUsersTransaction() : ', error);
        return null;
    }
}

async function fetchUserSessionTransaction({ email, password }) {
    let randomSessionId = '';

    const result = await User.findOne({
        userEmail: email,
        userPassword: password,
        isActive: true,
    });
    if (!result) {
        console.error('Failure in fetchUserSessionTransaction().');
        return null;
    } 
    
    randomSessionId = uuid.v4() + moment.now();
    setNodeCache(randomSessionId, result._id);

    console.info('Successfully executed fetchUserSessionTransaction()');
    return randomSessionId;
}

async function fetchUserProfileTransaction(user) {
    try {
        const result = await User.findOne({
            _id: user,
            isActive: true,
        }, {
            userName: 1,
            userEmail: 1,
            isActive: 1,
            expectedPerDayIntakeCalorie: 1
        });

        if(!result) {
            console.error('Failure in fetchUserProfileTransaction().');
            return null;
        }
        console.info('Successfully executed fetchUserProfileTransaction() : ', !!result);
        return result.toJSON();
    } catch (error) {
        console.error('Failure in fetchUserProfileTransaction() : ', error);
        return null;
    }
}

async function updateUserProfileTransaction(userData) {
    try {
        var result = await User.findOne({ _id: userData._id, isActive: true });
    
        if (!result) {
            console.error('Failure in fetching user in updateUserProfileTransaction().');
            return null;
        }
        console.info('Successfully find user in updateUserProfileTransaction() : ', !!result);
    
        result.userName = userData.userName || result.userName;
        result.userEmail = userData.userEmail || result.userEmail;
        result.userPassword = userData.userPassword || result.userPassword;
        result.expectedPerDayIntakeCalorie = userData.expectedPerDayIntakeCalorie || result.expectedPerDayIntakeCalorie;
        
        result = await result.save();
        if (!result) {
            console.error('Failure in updating user in updateUserProfileTransaction().');
            return null;
        }
        console.info('Successfully updated user in updateUserProfileTransaction() : ', !!result);
        result = result.toJSON();
        const { userPassword, ...rest } = result;
        return rest;
    } catch (error) {
        console.error('Failure in updateUserProfileTransaction() : ', error);
        return null;
    }
}

async function saveUserProfileTransaction(userData) {
    try {
        var result = await User.create(userData);
    
        if (!result) {
            console.error('Failure  in saveUserProfileTransaction().');
            return null;
        }
        console.info('Successfully created in saveUserProfileTransaction() : ', !!result);
    
        return result.toJSON();
    } catch (error) {
        console.error('Failure in saveUserProfileTransaction() : ', error);
        return null;
    }
}

async function toggleUserActiveTransaction(userData) {
    try {
        var result = await User.updateOne({ _id: userData._id }, {
            $set: {
                isActive: userData.isActive,
            }
        });
    
        if (!result) {
            console.error('Failure  in toggleUserActiveTransaction().');
            return null;
        }
        console.info('Successfully updated in toggleUserActiveTransaction() : ', !!result);
    
        return result && result.ok;
    } catch (error) {
        console.error('Failure in toggleUserActiveTransaction() : ', error);
        return null;
    }
}

async function createUserSessionTransaction(userId) {
    let randomSessionId = '';

    const result = await User.findOne({
        _id: userId,
        isActive: true,
    });

    if (!result) {
        console.error('Failure in createUserSessionTransaction().');
        return null;
    } 
    
    randomSessionId = uuid.v4() + moment.now();
    setNodeCache(randomSessionId, result._id, 300);

    console.info('Successfully executed createUserSessionTransaction()');
    return randomSessionId;
}

module.exports = {
    fetchAllUsersTransaction,
    fetchUserSessionTransaction,
    fetchUserProfileTransaction,
    updateUserProfileTransaction,
    saveUserProfileTransaction,
    toggleUserActiveTransaction,
    createUserSessionTransaction
};