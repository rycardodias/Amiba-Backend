const express = require('express')
const router = express.Router()

const Model = require('../models/Product')
const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')
const ProductType = require('../models/ProductType')
const Organization = require('../models/Organization')
const AnimalProduct = require('../models/AnimalProduct')
const { Op } = require("sequelize");
const Animal = require('../models/Animal')
const Exploration = require('../models/Exploration')

router.get('/', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: [ProductType, Organization] })
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

router.get('/id/:id', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id, { include: [ProductType, Organization] })

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

router.get('/allAvailable', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({
            include: {
                model: AnimalProduct,
                where: { quantityAvailable: { [Op.gt]: 0 } },
            }
        })
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

router.get('/allAvailable/id/:id', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.id) {
            response.error = "error_missing_fields"
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id, {
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

router.get('/allAvailable/ProductTypeId/:ProductTypeId', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.ProductTypeId) {
            response.error = "error_missing_fields"
            res.status(400).json(response)
        }
        const request = await Model.findAll
            (   { where: { ProductTypeId: req.params.ProductTypeId },
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

router.post('/create', removeCache('/products'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ProductTypeId, OrganizationId, tax, name, description, price } = req.body

        if (!(ProductTypeId && tax && name && price)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            ProductTypeId: ProductTypeId,
            OrganizationId: OrganizationId,
            tax: tax,
            name: name,
            description: description,
            price: price,
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


router.put('/update', removeCache('/products'), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, ProductTypeId, OrganizationId, tax, name, description, price } = req.body

        if (!id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            ProductTypeId: ProductTypeId,
            OrganizationId: OrganizationId,
            tax: tax,
            name: name,
            description: description,
            price: price,
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

router.delete('/delete', removeCache('/products'), async (req, res) => {
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