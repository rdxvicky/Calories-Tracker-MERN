const { validateFetchAdminSession, validateCreateUserSession, validateToggleUserActive } = require('../validations/admin');
const { fetchAllUsersTransaction, toggleUserActiveTransaction, createUserSessionTransaction } = require('../transactions/user.transactions');
const { fetchAdminSessionTransaction } = require('../transactions/admin.transactions');
const nconf = require('../conf');
const { takeNodeCache } = require('../middlewares/cachingModule');

async function fetchAllUsers(req, res, next) {

    const savedResult = await fetchAllUsersTransaction();

    if (!savedResult) {
        console.error('Failure in transacting fetchAllUsers().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching all users.',
        });
    }
    console.info('Successfully fetched all users : ', savedResult.length);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function fetchAdminSession(req, res, next) {
    const credentials = {
        email: req.body.email,
        password: req.body.password,
    };

    const errorJSON = validateFetchAdminSession(credentials);
    if (errorJSON.status) {
        console.error('Failure in validate fetchAdminSession().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    console.info('Successfully validate in fetchAdminSession().');
    const savedResult = await fetchAdminSessionTransaction(credentials);

    if (!savedResult) {
        console.error('Failure in transacting fetchAdminSession().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching admin session.',
        });
    }
    console.info('Successfully fetched admin session : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function toggleUserActive(req, res, next) {
    const userData = {
        _id: req.body._id,
        isActive: req.body.isActive || false,
    };

    const errorJSON = validateToggleUserActive(userData);
    if (errorJSON.status) {
        console.error('Failure in validate toggleUserActive().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    console.info('Successfully validate in toggleUserActive().');
    const savedResult = await toggleUserActiveTransaction(userData);

    if (!savedResult) {
        console.error('Failure in transacting toggleUserActive().');
        return res.status(400).json({
            success: false,
            message: 'Failed in updating user data.',
        });
    }
    console.info('Successfully updated user data : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: userData,
    });
}

async function createUserSession(req, res, next) {
    const userId = req.body._id;

    const errorJSON = validateCreateUserSession(userId);
    if (errorJSON.status) {
        console.error('Failure in validate createUserSession().');
        return res.status(400).json({
            success: false,
            message: errorJSON.message,
        });
    }
    console.info('Successfully validate createUserSession().');
    const savedResult = await createUserSessionTransaction(userId);

    if (!savedResult) {
        console.error('Failure in transacting createUserSession().');
        return res.status(400).json({
            success: false,
            message: 'Failed in fetching user session.',
        });
    }
    console.info('Successfully fetched user session : ', !!savedResult);

    return res.status(200).json({
        success: true,
        body: savedResult,
    });
}

async function adminLogout(req, res, next) {    
    try {
        takeNodeCache(nconf.get('ADMIN_SESSION_ID'));
    } catch (error) {
        console.error('Failure in transacting adminLogout().');
        return res.status(400).json({
            success: false,
            message: 'Failed in removing Admin session.',
        });
    }
    
    console.info('Successfully removed Admin session');
  
    return res.status(200).json({
        success: true
    });
}

module.exports = {
    fetchAllUsers,
    fetchAdminSession,
    toggleUserActive,
    createUserSession,
    adminLogout
};