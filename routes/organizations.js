const express = require('express')
const router = express.Router()
const Model = require('../models/Organization')
const User = require('../models/User')
const Product = require('../models/Product')
const AnimalProduct = require('../models/AnimalProduct')
const EggsBatchProduct = require('../models/EggsBatchProduct')

const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits, error_invalid_token } = require('../lib/ResponseMessages')
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Sequelize } = require('../config/database')
const { verifyTokenPermissions, validateToken } = require('../verifications/tokenVerifications');


router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({
            include: [
                { model: User, attributes: ['id', 'name'] }]
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
        const request = await Model.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['id', 'name'] }]
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

router.get('/UserId/:UserId', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.UserId) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const request = await Model.findAll({ where: { UserId: req.params.UserId } })

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

router.get('/productAvailable', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({
            attributes: {
                exclude: ["address", "locale", "zipcode", "telephone", "mobilePhone", "fiscalNumber", "createdAt", "updatedAt", "UserId"],
                include: [
                    [Sequelize.literal(`(SELECT COUNT(*) FROM "Products" p WHERE p."id" = "Products"."id" AND p."OrganizationId" = "Organization"."id")`), "totalProducts"]
                ]
            },
            include: [{
                model: Product,
                attributes: ['id'],
                include: [{
                    model: AnimalProduct,
                    attributes: ['id', 'quantityAvailable'],
                }, {
                    model: EggsBatchProduct,
                    attributes: ['id', 'quantityAvailable'],
                }],
            }],
            where: {
                [Op.or]: [
                    { '$Products.AnimalProducts.quantityAvailable$': { [Op.gt]: 0 } },
                    { '$Products.EggsBatchProducts.quantityAvailable$': { [Op.gt]: 0 } }
                ]
            }
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

router.post('/create', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body


        if (!(UserId && name && address && locale && zipcode && fiscalNumber)) {
            response.message = error_missing_fields
            response.error = error_missing_fields

            return res.status(400).json(response)
        }

        const data = {
            UserId: UserId,
            name: name,
            address: address,
            locale: locale,
            zipcode: zipcode,
            telephone: telephone || undefined,
            mobilePhone: mobilePhone || undefined,
            fiscalNumber: fiscalNumber
        }
        console.log(data)

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
        const { id, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            UserId: UserId,
            name: name,
            address: address,
            locale: locale,
            zipcode: zipcode,
            telephone: telephone || null,
            mobilePhone: mobilePhone || null,
            fiscalNumber: fiscalNumber
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
            response.error = id
            return res.status(400).json(response)
        }

        if (!await verifyTokenPermissions(req.session.token, ['ADMIN', 'AMIBA'])) {
            response.message = error_invalid_token_or_permission
            response.error = error_invalid_token_or_permission
            return res.status(req.session.token ? 403 : 401).json(response)
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