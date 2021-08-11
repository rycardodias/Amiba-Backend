

const mcache = require('memory-cache');

module.exports = (url) => (req, res, next) => {
    let key = '__express__' + url
    mcache.del(key)

    return next()
}