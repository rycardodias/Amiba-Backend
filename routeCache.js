const ResponseModel = require('./lib/ResponseModel')

const mcache = require('memory-cache');

module.exports = duration => (req, res, next) => {
    const response = new ResponseModel()

    if (req.method !== 'GET') {
        response.error = 'Erro! Apenas metodos GET podem ter cache!'
        res.status(400).json(response)
        return next()
    }

    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)

    if (cachedBody) {
        response.data = JSON.parse(cachedBody).data
        return res.status(200).json(response)


    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            mcache.put(key, body, (duration || 3) * 60 * 1000, function (key, value) {
                // console.log("expirou", key)
            });
            res.sendResponse(body)
        }
        next()
    }
}

   // const response = new ResponseModel()
    // if (req.method !== 'GET') {
    //     res.error = 'Erro! Apenas metodos GET podem ter cache!'
    //     res.status(400).json(response)
    //     return next()
    // }

    // const cachedResponse = cache.get(req.originalUrl)

    // if (cachedResponse) {
    //     response.data = JSON.parse(cachedResponse)

    //     res.status(200).json(response)
    // }
    // else {
    //     res.originalSend = res.send
    //     res.send = body => {
    //         res.originalSend(body)
    //         cache.set(key, body, (duration || 300))
    //     }
    //     next()
    // }