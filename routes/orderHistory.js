const express = require('express')
const router = express.Router()

const Model = require('../models/OrderHistory')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const Order = require('../models/Order')
const OrderLine = require('../models/OrderLine')
const EggsBatchProduct = require('../models/EggsBatchProduct')
const AnimalProduct = require('../models/AnimalProduct')
const Product = require('../models/Product')
const Organization = require('../models/Organization')

const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { verifyPermissionArray } = require('../verifications/tokenVerifications');

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: Order })
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

        if (!token && !process.env.DEV_MODE) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        let tokenDecoded = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET)

        let request
        if (await verifyPermissionArray(tokenDecoded.permission, ['ADMIN', 'AMIBA'])) {
            request = await Model.findAll({
                include: {
                    model: Order,
                }
            })
        } else {
            request = await Model.findAll({
                include: {
                    model: Order,
                    include: {
                        model: OrderLine,
                        required: true,
                        include: [{
                            model: EggsBatchProduct,
                            attributes: ['id', 'ProductId'],
                            include: {
                                model: Product,
                                required: true,
                                attributes: ['id', 'name', 'OrganizationId'],
                                include: {
                                    model: Organization,
                                    required: true,
                                    where: { UserId: tokenDecoded.id },
                                    attributes: ['id', 'name', 'UserId'],
                                }
                            }

                        },
                        {
                            model: AnimalProduct,
                            attributes: ['id', 'ProductId'],
                            include: {
                                model: Product,
                                required: true,
                                attributes: ['id', 'name', 'OrganizationId'],
                                include: {
                                    model: Organization,
                                    required: true,
                                    where: { UserId: tokenDecoded.id },
                                    attributes: ['id', 'name', 'UserId'],
                                }
                            }
                        }],

                    },
                },
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                { '$Order.OrderLines.EggsBatchProductId$': { [Op.not]: null } },
                                { '$Order.OrderLines.EggsBatchProduct.id$': { [Op.not]: null } }
                            ]
                        },
                        {
                            [Op.and]: [
                                { '$Order.OrderLines.AnimalProductId$': { [Op.not]: null } },
                                { '$Order.OrderLines.AnimalProduct.id$': { [Op.not]: null } }
                            ]
                        }
                    ],
                }
            })
        }

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

router.get('/id/:id', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id, { include: Order })

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

router.post('/create', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { state, OrderId } = req.body


        if (!(state && OrderId)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            state: state,
            OrderId: OrderId
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
        const { id, state } = req.body

        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            state: state,
        }

        const request = await Model.update(data, {
            where: { id: id },
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