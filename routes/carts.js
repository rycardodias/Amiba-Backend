const express = require('express')
const router = express.Router()

const Model = require('../models/Cart')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const Product = require('../models/Product')
const AnimalProduct = require('../models/AnimalProduct')
const EggsBatchProduct = require('../models/EggsBatchProduct')
const { Op } = require("sequelize");
const Animal = require('../models/Animal')
const Exploration = require('../models/Exploration')
const Organization = require('../models/Organization')
const EggsBatch = require('../models/EggsBatch')
const jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({
            include: [
                { model: EggsBatchProduct },
                { model: AnimalProduct },

            ]
        })
        if (request.length > 0) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
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
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id, { include: [] })

        if (request) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }

})

router.get('/UserId', async (req, res) => {
    const response = new ResponseModel()

    try {
        const { token } = req.session

        if (!token && !process.env.DEV_MODE) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        let tokenDecoded = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET)

        const request = await Model.findAll({ where: { UserId: tokenDecoded.id } })

        if (request.length > 0) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

router.get('/UserId/Product', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { token } = req.session

        if (!token && !process.env.DEV_MODE) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        let tokenDecoded = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET)

        const request = await Model.findAll({
            where: { UserId: tokenDecoded.id },
            include: [
                {
                    model: AnimalProduct, include: [
                        Product,
                        {
                            model: Animal, include: [{
                                model: Exploration, include: Organization
                            }]
                        }]
                },
                {
                    model: EggsBatchProduct, include: [
                        Product,
                        {
                            model: EggsBatch,
                            // include: EggsBatchExploration
                        }]
                }
            ]
        })

        if (request.length > 0) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

router.post('/create', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { AnimalProductId, EggsBatchProductId, quantity } = req.body

        const { token } = req.session

        if (!(token && process.env.DEV_MODE && (AnimalProductId || EggsBatchProductId) && quantity)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        let tokenDecoded = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET)

        const data = {
            UserId: tokenDecoded.id,
            AnimalProductId: AnimalProductId,
            EggsBatchProductId: EggsBatchProductId,
            quantity: quantity
        }

        const exists = await Model.findAndCountAll({
            where: {
                AnimalProductId: AnimalProductId || null,
                EggsBatchProductId: EggsBatchProductId || null,
                UserId: tokenDecoded.id
            },
        })

        if (exists.count > 0) {

            const update = await Model.increment({ quantity: quantity }, {
                where: {
                    AnimalProductId: AnimalProductId || null,
                    EggsBatchProductId: EggsBatchProductId || null,
                    UserId: tokenDecoded.id
                },
            })
            response.message = success_row_create
            response.data = update[0][0][0]
            return res.status(200).json(response)
        }

        const request = await Model.create(data)

        if (request) {
            response.message = success_row_create
            response.data = request
            return res.status(200).json(response)
        } else {
            response.error = error_row_create
            return res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.put('/update', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId, AnimalId, EggsBatchId, quantity } = req.body

        if (!(ProductId && (AnimalId || EggsBatchId))) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            quantity: quantity
        }

        const request = await Model.update(data, {
            where: { ProductId: Productid },
            returning: true
        })

        if (request[0] === 1) {
            response.message = success_row_update
            response.data = request[1][0].dataValues
            res.status(200).json(response)
        } else {
            response.message = error_row_update
            response.error = request[0]
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.delete('/delete', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id } = req.body
        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await Model.destroy({ where: { id: id } })

        if (request === 1) {
            response.message = success_row_delete
            response.data = success_row_delete
            res.status(200).json(response)
        } else {
            response.message = error_row_delete
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