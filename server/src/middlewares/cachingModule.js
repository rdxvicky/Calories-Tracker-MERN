const Cache = require('node-cache');

// Standard TTL will 60 min
const NodeCache = new Cache({ stdTTL: 3600, checkperiod: 15 });

const getNodeCache = key => NodeCache.get(key);

const setNodeCache = (key, val, ttl = 3600) => NodeCache.set(key, val, ttl);

const takeNodeCache = key => NodeCache.take(key);

const hasNodeCache = key => NodeCache.has(key);

const deleteNodeCache = key => NodeCache.del(key);

module.exports = {
    getNodeCache,
    setNodeCache,
    takeNodeCache,
    hasNodeCache,
    deleteNodeCache,
};