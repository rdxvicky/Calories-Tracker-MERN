const uuid = require('uuid');
const moment = require('moment');
const nconf = require('../conf');
const { setNodeCache } = require('../middlewares/cachingModule');

async function fetchAdminSessionTransaction({ email, password }) {
    const ADMIN_SESSION_ID = nconf.get('ADMIN_SESSION_ID');
    var randomSessionId = '';

    if (email === nconf.get('ADMIN_EMAIL') &&
        password === nconf.get('ADMIN_PASSWORD')) {
            randomSessionId = uuid.v4() + moment.now();
            setNodeCache(ADMIN_SESSION_ID, randomSessionId, 300);
    } else {
        console.error('Failure in fetchAdminSessionTransaction().');
        return null;
    }

    console.info('Successfully executed fetchAdminSessionTransaction()');
    return randomSessionId;
}

module.exports = {
    fetchAdminSessionTransaction,
};