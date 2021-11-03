const express = require('express')
const router = express.Router()

const ResponseModel = require('../lib/ResponseModel')

router.get('/requiredFields/:table', async (req, res) => {
    const response = new ResponseModel()

    const data = {
        'animal': [],
        'animalProducts': [],
        'carts': [],
        'certifications': [],
        'eggsBatchs': [],
        'eggsBatchExplorations': [],
        'eggsBatchProducts': [],
        'explorations': [],
        'explorationTypes': ['id', 'name'],
        'menus': ['id', 'name', 'active'],
        'orders': [],
        'orderHistory': [],
        'orderLines': [],
        'organizations': ['id', 'name', 'address', 'locale', 'zipcode', 'fiscalNumber'],
        'organizationTypes': ['id', 'name'],
        'products': [],
        'productTypes': ['id', 'name'],
        'races': [],
        'restaurants': ['id', 'UserId', 'name', 'description', 'address', 'locale', 'zipcode', 'fiscalNumber'],
        'users': ['id', 'name'], //TODO acabar,

    }

    var keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];

        var prop = data[req.params.table];
    }

    response.message = 'Chaves obrigatórias'
    response.data = prop
    res.status(200).json(response)
})

module.exports = router
