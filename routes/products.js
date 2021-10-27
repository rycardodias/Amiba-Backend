const express = require('express')
const router = express.Router()

const Model = require('../models/Product')
const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const ProductType = require('../models/ProductType')
const Organization = require('../models/Organization')
const AnimalProduct = require('../models/AnimalProduct')
const EggsBatchProduct = require('../models/EggsBatchProduct')

const { Op } = require("sequelize");
const Animal = require('../models/Animal')
const Exploration = require('../models/Exploration')
const db = require('../config/database');
const { Sequelize } = require('../config/database')

router.get('/', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: [ProductType, Organization] })
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
        const request = await Model.findByPk(req.params.id, { include: [ProductType, Organization] })

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

router.get('/type/:type', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.type) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findAll({ where: { type: req.params.type }, include: [ProductType, Organization] })

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
            include: [AnimalProduct, EggsBatchProduct],
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

router.get('/allAvailable/id/:id', async (req, res) => {
    const response = new ResponseModel()
    try {
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
                    model: ProductType,
                    attributes: ['name', 'description']
                },
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

router.get('/allAvailable/ProductTypeId/:ProductTypeId', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.ProductTypeId) {
            response.error = "error_missing_fields"
            res.status(400).json(response)
        }
        const request = await Model.findAll
            ({
                where: { ProductTypeId: req.params.ProductTypeId },
                include: [
                    {
                        model: ProductType,
                        attributes: ['name', 'description']
                    },
                    {
                        model: AnimalProduct,
                        where: { quantityAvailable: { [Op.gt]: 0 } }, attributes: ['quantityAvailable'],
                        include: {
                            model: Animal, attributes: ['id'],
                            include: {
                                model: Exploration, attributes: ['id'],
                                include: {
                                    model: Organization, attributes: ['id', 'name'],
                                }
                            }
                        }

                    }
                ]
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

router.post('/create', removeCache(['/products']), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { type, ProductTypeId, OrganizationId, tax, name, description, price, unit, image } = req.body

        if (!(type && ProductTypeId && tax && name && price && unit)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            type: type,
            ProductTypeId: ProductTypeId,
            OrganizationId: OrganizationId,
            tax: tax,
            name: name,
            description: description,
            price: price,
            unit: unit,
            image: image,
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


router.put('/update', removeCache(['/products', '/products/allAvailable']), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, ProductTypeId, tax, name, description, price, image } = req.body

        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            ProductTypeId: ProductTypeId,
            tax: tax,
            name: name,
            description: description,
            price: price,
            image: image,
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

router.delete('/delete', removeCache(['/products', '/products/allAvailable']), async (req, res) => {
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