const express = require('express')
const { Sequelize } = require('sequelize')
const router = express.Router()

const ResponseModel = require('../lib/ResponseModel')
const { sequelize } = require('../models/User')

router.get('/logs', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await sequelize.query('SELECT * FROM \"Logs"\;')
        if (request.length > 0) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = "No data found"
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = "No data found"
        response.error = error
        return res.status(400).json(response)
    }

})

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
        'organizations': ['id', 'name', 'address', 'locale', 'zipcode', 'fiscalNumber', 'UserId'],
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

    res.status(200).json({ teste: "aa" })
})

module.exports = router
