const express = require('express')
const router = express.Router()

const ResponseModel = require('../lib/ResponseModel')

router.get('/requiredFields/:table', async (req, res) => {
    const response = new ResponseModel()

    const data = {
        'restaurants': ['UserId', 'name', 'description', 'address', 'locale', 'zipcode', 'fiscalNumber'],
        'users': ['id', 'name'] //TODO acabar
    }

    var keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];

        var prop = data[req.params.table];
    }
    
    response.message = 'Chaves obrigatórias'
    response.data = prop //[req.params.table]
        res.status(200).json(response)
})

module.exports = router
