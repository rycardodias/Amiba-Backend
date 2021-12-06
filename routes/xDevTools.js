const express = require('express')
const { Sequelize } = require('sequelize')
const router = express.Router()

const ResponseModel = require('../lib/ResponseModel')
const { sequelize } = require('../models/User')

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
        'menus': ['id', 'name', 'active'],
        'orders': [],
        'orderHistory': [],
        'orderLines': [],
        'organizations': ['id', 'type', 'name', 'address', 'locale', 'zipcode', 'fiscalNumber', 'UserId'],
        'products': [],
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

router.get('/teste', async (req, res) => {

    const response = await sequelize.query('CALL public.sp_teste()')

    res.status(200).json({teste: "aa"})
})

module.exports = router
