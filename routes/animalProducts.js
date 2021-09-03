const express = require('express')
const router = express.Router()
const AnimalProduct = require('../models/AnimalProduct')
const Product = require('../models/Product')

const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')
const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache')
const db = require('../config/database')

// db.sync({alter: true})

router.get('/', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await AnimalProduct.findAll({ include: Product })
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

router.get('/id/:ProductId/:AnimalId', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, AnimalId } = req.params
        if (!(ProductId && AnimalId)) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await AnimalProduct.findOne({ where: { ProductId: ProductId, AnimalId: AnimalId }, include: Product })

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

router.post('/create', removeCache('/animalProducts'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, AnimalId, quantity, quantityAvailable } = req.body

        if (!(ProductId && AnimalId && quantity)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            ProductId: ProductId,
            AnimalId: AnimalId,
            quantity: quantity,
            quantityAvailable: quantityAvailable || quantity
        }

        const request = await AnimalProduct.create(data)

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

router.put('/update', removeCache('/animalProducts'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, AnimalId, quantity, quantityAvailable } = req.body


        if (!(ProductId && AnimalId)) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            quantity: quantity,
            quantityAvailable: quantityAvailable
        }

        const request = await AnimalProduct.update(data, { where: { ProductId: ProductId, AnimalId: AnimalId } })

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


router.delete('/delete', removeCache('/animalProducts'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, AnimalId } = req.body
        if (!(ProductId, AnimalId)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await AnimalProduct.destroy({ where: { ProductId: ProductId, AnimalId: AnimalId } })

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