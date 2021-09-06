const express = require('express')
const router = express.Router()
const AnimalProductOrderLine = require('../models/AnimalProductOrderLine')

const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')
const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache')

router.get('/', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await AnimalProductOrderLine.findAll()
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

// router.get('/id/:OrderLineId/:AnimalProductId', cache(), async (req, res) => {
//     const response = new ResponseModel()
//     try {
//         const { ProductId, AnimalId } = req.params
//         if (!(ProductId && AnimalId)) {
//             response.error = error_missing_fields
//             res.status(400).json(response)
//         }
//         const request = await AnimalProductOrderLine.findOne({ where: { ProductId: ProductId, AnimalId: AnimalId }, include: Product })

//         if (request) {
//             response.data = request
//             res.status(200).json(response)
//         } else {
//             response.error = error_data_not_found
//             res.status(404).json(response)
//         }
//     } catch (error) {
//         response.message = error_invalid_fields
//         response.error = error
//         return res.status(400).json(response)
//     }

// })

router.post('/create', removeCache('/animalProducts'), async (req, res) => { //TODO alteral removeCache
    const response = new ResponseModel()
    try {
        const { OrderLineId, AnimalProductId, quantity } = req.body

        if (!(OrderLineId && AnimalProductId && quantity)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            OrderLineId: OrderLineId,
            AnimalProductId: AnimalProductId,
            quantity: quantity
        }

        const request = await AnimalProductOrderLine.create(data)

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
        const { OrderLineId, AnimalProductId, quantity } = req.body


        if (!(OrderLineId && AnimalProductId)) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            quantity: quantity
        }

        const request = await AnimalProductOrderLine.update(data, { where: { OrderLineId: OrderLineId, AnimalProductId: AnimalProductId } })

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
        const { OrderLineId, AnimalProductId, } = req.body
        if (!(OrderLineId && AnimalProductId)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await AnimalProductOrderLine.destroy({ where: { OrderLineId: OrderLineId, AnimalProductId: AnimalProductId } })

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