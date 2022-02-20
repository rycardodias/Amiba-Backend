const express = require('express')
const router = express.Router()

const Model = require('../models/Product')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const Organization = require('../models/Organization')
const AnimalProduct = require('../models/AnimalProduct')
const EggsBatchProduct = require('../models/EggsBatchProduct')
const { Op } = require("sequelize");
const Exploration = require('../models/Exploration')
const { Sequelize } = require('../config/database')
const jwt = require("jsonwebtoken");
const { verifyPermissionArray } = require('../verifications/tokenVerifications');

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: [Organization] })
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
                    model: Organization
                }
            })
        } else {
            request = await Model.findAll({
                include: {
                    model: Organization,
                    required: true,
                    where: { UserId: tokenDecoded.id },
                    attributes: ['id', 'UserId']
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
        const request = await Model.findByPk(req.params.id, { include: [Organization] })

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

router.get('/type/:type', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.type) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findAll({ where: { type: req.params.type }, include: [Organization] })

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

router.get('/ExplorationId/:ExplorationId/type/:type', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { type, ExplorationId } = req.params
        if (!(type && ExplorationId)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findAll({
            where: {
                type: type
            },
            include: [{
                model: Organization,
                required: true,
                attributes: ['id'],
                include: [{
                    model: Exploration,
                    required: true,
                    attributes: ['id', 'OrganizationId'],
                    where: {
                        id: req.params.ExplorationId
                    }
                }],
            }],
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

router.get('/allAvailable', async (req, res) => {
    const response = new ResponseModel()
    try {

        const request = await Model.findAll({
            attributes: {
                include: [
                    [Sequelize.literal(`(
                        SELECT CAST(sum AS INTEGER)
                        FROM (
                            SELECT SUM("quantityAvailable")
                            FROM "AnimalProducts"
                            WHERE "AnimalProducts"."ProductId" = "Product"."id"
                            UNION ALL
                            SELECT SUM("quantityAvailable")
                            FROM "EggsBatchProducts"
                            WHERE "EggsBatchProducts"."ProductId" = "Product"."id"
                            ) v
                        WHERE sum IS NOT NULL)
                        `), "quantityAvailable"
                    ],

                ],
            },
            include: [
                { model: AnimalProduct, required: false },
                { model: EggsBatchProduct, required: false },
                { model: Organization, attributes: ['id', 'name'] },
            ],
            where: {
                [Op.or]: [
                    { '$AnimalProducts.quantityAvailable$': { [Op.gt]: 0 } }
                    , { '$EggsBatchProducts.quantityAvailable$': { [Op.gt]: 0 } }],
            },

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

router.get('/allAvailable/id/:id', async (req, res) => {
    const response = new ResponseModel()
    try {
        console.log(req.params)
        if (!req.params.id) {
            response.error = "error_missing_fields"
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id, {
            attributes: {
                include: [
                    [Sequelize.literal(`(
                        SELECT CAST(sum AS INTEGER)
                        FROM (
                            SELECT SUM("quantityAvailable")
                            FROM "AnimalProducts"
                            WHERE "AnimalProducts"."ProductId" = "Product"."id"
                            UNION ALL
                            SELECT SUM("quantityAvailable")
                            FROM "EggsBatchProducts"
                            WHERE "EggsBatchProducts"."ProductId" = "Product"."id"
                            ) v
                        WHERE sum IS NOT NULL)
                        `), "quantityAvailable"
                    ],
                ],
            },
            include: [
                {
                    model: AnimalProduct,
                    required: false,
                    where: { quantityAvailable: { [Op.gt]: 0 } }
                },
                {
                    model: EggsBatchProduct,
                    required: false,
                    where: { quantityAvailable: { [Op.gt]: 0 } }
                }
            ],
        })

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

router.get('/allAvailable/type/:type', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.type) {
            response.error = "error_missing_fields"
            res.status(400).json(response)
        }
        const request = await Model.findAll({
            attributes: {
                include: [
                    [Sequelize.literal(`(
                        SELECT CAST(sum AS INTEGER)
                        FROM (
                            SELECT SUM("quantityAvailable")
                            FROM "AnimalProducts"
                            WHERE "AnimalProducts"."ProductId" = "Product"."id"
                            UNION ALL
                            SELECT SUM("quantityAvailable")
                            FROM "EggsBatchProducts"
                            WHERE "EggsBatchProducts"."ProductId" = "Product"."id"
                            ) v
                        WHERE sum IS NOT NULL)
                        `), "quantityAvailable"
                    ],

                ],
            },
            include: [AnimalProduct, EggsBatchProduct, Organization],
            where: {
                [Op.or]: [
                    { '$AnimalProducts.quantityAvailable$': { [Op.gt]: 0 } }
                    , { '$EggsBatchProducts.quantityAvailable$': { [Op.gt]: 0 } }],
                type: req.params.type
            }
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

router.get('/allAvailable/type/:type/organization/:organization', async (req, res) => {
    const response = new ResponseModel()
    try {
        // const { type, organization } = req.params

        if (!(req.params.type && req.params.organization)) {
            response.error = "error_missing_fields"
            res.status(400).json(response)
        }

        const request = await Model.findAll({
            attributes: {
                include: [
                    [Sequelize.literal(`(
                        SELECT CAST(sum AS INTEGER) FROM (SELECT SUM("quantityAvailable") FROM "AnimalProducts" WHERE "AnimalProducts"."ProductId" = "Product"."id" UNION ALL
                            SELECT SUM("quantityAvailable") FROM "EggsBatchProducts" WHERE "EggsBatchProducts"."ProductId" = "Product"."id") v WHERE sum IS NOT NULL)`
                    ), "quantityAvailable"
                    ],

                ],
            },
            include: [AnimalProduct, EggsBatchProduct, Organization],
            where: {
                [Op.or]: [
                    { '$AnimalProducts.quantityAvailable$': { [Op.gt]: 0 } }
                    , { '$EggsBatchProducts.quantityAvailable$': { [Op.gt]: 0 } }],
                type: req.params.type,
                OrganizationId: req.params.organization

            }
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

router.post('/allAvailable/inOrganization', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { organizations } = req.body
        const request = await Model.findAll({
            include: [AnimalProduct, EggsBatchProduct,
                {
                    model: Organization,
                    required: true,
                    where: { id: { [Op.in]: organizations } }
                }],
            where: {
                [Op.or]: [
                    { '$AnimalProducts.quantityAvailable$': { [Op.gt]: 0 } }
                    , { '$EggsBatchProducts.quantityAvailable$': { [Op.gt]: 0 } }],
            }
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
        const { type, OrganizationId, tax, name, description, image, price, unit } = req.body

        if (!(type && tax && name && price && unit)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            type: type,
            OrganizationId: OrganizationId,
            tax: tax,
            name: name,
            description: description,
            image: image,
            price: price,
            unit: unit
        }

        const request = await Model.create(data)
        console.log("request", request)
        if (request) {
            response.message = success_row_create
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_row_create
            res.status(404).json(response)
        }
    } catch (error) {
        console.log(`error`, error)
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})


router.put('/update', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, tax, name, description, image, price } = req.body

        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            tax: tax,
            name: name,
            description: description,
            image: image,
            price: price,
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