const { getNodeCache } = require('../middlewares/cachingModule');
const nconf = require('../conf');

async function verifySession(req, res, next) {
  const sessionId = req.query.sessionId;

  if(!sessionId) {
    console.error('Session Id Missing.');
    return res.status(401).json({
      success: false,
      message: 'Session Id is missing.'
    });
  }

  if (sessionId === getNodeCache(nconf.get('ADMIN_SESSION_ID'))) {
    console.info('ADMIN Session Verified Successfully.');

    return res.status(200).json({
      success: true,
      body: {
        sessionId: getNodeCache(nconf.get('ADMIN_SESSION_ID')),
        role: "ADMIN-SESSION-ID",
      },
    });
  }

  if (getNodeCache(sessionId)) {
    console.info('USER Session Verified Successfully.');

    return res.status(200).json({
      success: true,
      body: {
        sessionId: sessionId,
        role: "USER-SESSION-ID",
      },
    });
  }

  res.status(401).json({
    success: false,
    message: "UnAutherized Access",
  });
}

module.exports = {
  verifySession,
};