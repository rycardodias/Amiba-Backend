const express = require('express')
const router = express.Router()
const Model = require('../models/OrderLine')
const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')
const Product = require('../models/Product')

router.get('/',  async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll()
        if (request.length > 0) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }

})

router.get('/id/:id', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id)

        if (request) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }

})

router.get('/OrderId/:OrderId', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.OrderId) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findAll({ where: { OrderId: req.params.OrderId } })

        if (request) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }

})

router.post('/create', removeCache('/orderLines', '/orders', '/products/allAvailable'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { OrderId, quantity, AnimalProductId, EggsBatchProductId } = req.body

        //FIXME não esta a deixar criar um estes parametros, falta os id ||id
        // if (!(OrderId && quantity)) {
        //     response.error = error_missing_fields
        //     return res.status(400).json(response)
        // }

        const data = {
            OrderId: OrderId,
            quantity: quantity,
            AnimalProductId: AnimalProductId,
            EggsBatchProductId: EggsBatchProductId,
        }

        const request = await Model.create(data)

        if (request) {
            response.message = success_row_create
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_row_create
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})


router.put('/update', removeCache('/orderLines', '/orders', '/products/allAvailable'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, OrderId, quantity, AnimalProductId, EggsBatchProductId } = req.body

        if (!id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            OrderId: OrderId,
            quantity: quantity,
            AnimalProductId: AnimalProductId,
            EggsBatchProductId: EggsBatchProductId,
        }

        const request = await Model.update(data, { where: { id: id } })

        if (request == 1) {
            response.data = success_row_update
            res.status(200).json(response)
        } else {
            response.error = error_row_update
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.delete('/delete', removeCache('/orderLines', '/orders', '/products/allAvailable'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id } = req.body
        if (!id) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await Model.destroy({ where: { id: id } })

        if (request === 1) {
            response.data = success_row_delete
            res.status(200).json(response)
        } else {
            response.error = error_row_delete
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

module.exports = router