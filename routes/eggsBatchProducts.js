const express = require('express')
const router = express.Router()
const Model = require('../models/EggsBatchProduct')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')
const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache')
const Product = require('../models/Product')


router.get('/', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({include: Product})
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

router.get('/id/:ProductId/:EggsBatchId', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, EggsBatchId } = req.params
        if (!(ProductId && EggsBatchId)) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findOne({ where: { ProductId: ProductId, EggsBatchId: EggsBatchId }, include: Product })

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

router.post('/create', removeCache('/EggsBatchProducts'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, EggsBatchId, quantity } = req.body

        if (!(ProductId && EggsBatchId && quantity)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            ProductId: ProductId,
            EggsBatchId: EggsBatchId,
            quantity: quantity
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

router.put('/update', removeCache('/EggsBatchProducts'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, EggsBatchId, quantity } = req.body


        if (!(ProductId && EggsBatchId)) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            quantity: quantity
        }

        const request = await Model.update(data, { where: { ProductId: ProductId, EggsBatchId: EggsBatchId } })

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


router.delete('/delete', removeCache('/EggsBatchProducts'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, EggsBatchId } = req.body
        if (!(ProductId, EggsBatchId)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await Model.destroy({ where: { ProductId: ProductId, EggsBatchId: EggsBatchId } })

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