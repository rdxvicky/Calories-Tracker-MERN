const { getNodeCache } = require('./cachingModule');
const nconf = require('../conf');

async function adminFilter(req, res, next) {
    const sessionId = req.headers.sessionid;

    if (!sessionId) {
        console.error('Session Id Missing in authFilter().');
        return res.status(401).json({
            success: false,
            message: 'UnAutherized Access'
        });
    }

    if (sessionId === getNodeCache(nconf.get('ADMIN_SESSION_ID'))) {
        console.info('ADMIN Session Verified Successfully in authFilter().');
        req.metaData = {
            role: 'ADMIN',
            sessionId: getNodeCache(nconf.get('ADMIN_SESSION_ID'))
        }
        return next();
    }


    console.error('Session Expired in authFilter().');

    return res.status(401).json({
        success: false,
        message: 'UnAutherized Access'
    });
}

async function userFilter(req, res, next) {
    const sessionId = req.headers.sessionid;

    if (!sessionId) {
        console.error('Session Id Missing in userFilter().');
        return res.status(401).json({
            success: false,
            message: 'UnAutherized Access'
        });
    }

    if (getNodeCache(sessionId)) {
        console.info('USER Session Verified Successfully in userFilter().');
        req.metaData = {
            role: 'USER',
            _id: getNodeCache(sessionId),
            sessionId: sessionId,
        };
        return next();
    }


    console.error('Session Expired in userFilter().');

    return res.status(401).json({
        success: false,
        message: 'UnAutherized Access'
    });
}

module.exports = {
    adminFilter,
    userFilter
};