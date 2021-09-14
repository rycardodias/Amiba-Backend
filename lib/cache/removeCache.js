

const mcache = require('memory-cache');

module.exports = (url) => (req, res, next) => {
    let i = 0;
    let key = ''
    while (i < url.length) {
        key = '__express__' + url[i]
        // console.log(key)
        mcache.del(key)
        i++
    }


    return next()
}