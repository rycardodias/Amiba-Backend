const express = require('express')
const router = express.Router()
const Model = require('../models/AnimalProduct')
const Product = require('../models/Product')
const Animal = require('../models/Animal')
const Organization = require('../models/Organization')
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const { verifyPermissionArray, verifyTokenPermissions } = require('../verifications/tokenVerifications');

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: Product })
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

router.get('/UserId', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { token } = req.session

        let tokenDecoded = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET)

        let request
        if (await verifyPermissionArray(tokenDecoded.permission, ['ADMIN', 'AMIBA'])) {
            request = await Model.findAll({
                include: [
                    {
                        model: Product,
                        attributes: ['name', 'OrganizationId'],
                        include: {
                            model: Organization,
                            required: true,
                            attributes: ['id', 'name', 'UserId']
                        }
                    },
                    {
                        model: Animal,
                        required: true,
                        attributes: ['id', 'identifier', 'lgn', 'lga', 'ExplorationId'],
                    }
                ]
            })
        } else {
            request = await Model.findAll({
                include: [
                    {
                        model: Product,
                        attributes: ['name', 'OrganizationId'],
                        include: {
                            model: Organization,
                            required: true,
                            where: { UserId: tokenDecoded.id },
                            attributes: ['id', 'name', 'UserId']
                        }
                    },
                    {
                        model: Animal,
                        required: true,
                        attributes: ['id', 'identifier', 'lgn', 'lga', 'ExplorationId'],

                    }
                ]
            })
        }

        console.log(request)
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
        console.log(error)
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

router.get('/ProductId/:ProductId/AnimalId/:AnimalId', async (req, res) => {
    const response = new ResponseModel()
    try {

        const { ProductId, AnimalId } = req.params
        if (!(ProductId && AnimalId)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findOne({ where: { ProductId: ProductId, AnimalId: AnimalId }, include: Product })

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

router.get('/available/ProductId/:ProductId', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductId } = req.params
        if (!ProductId) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findAll({ where: { ProductId: ProductId, quantityAvailable: { [Op.gt]: 0 } } })

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
        const { ProductId, AnimalId, quantity } = req.body

        if (!(ProductId && AnimalId && quantity)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            ProductId: ProductId,
            AnimalId: AnimalId,
            quantity: quantity,
            quantityAvailable: quantity
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

router.put('/update', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, quantity, quantityAvailable } = req.body


        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            quantity: quantity,
            quantityAvailable: quantityAvailable
        }

        const request = await Model.update(data, {
            where: { id: id },
            returning: true,
            individualHooks: true
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
        console.log(error)
        response.message = error_invalid_fields
        response.error = error.message
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
        const request = await Model.destroy({ where: { id: id }, individualHooks: true })


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
        response.error = error.message
        return res.status(400).json(response)
    }
})

module.exports = router