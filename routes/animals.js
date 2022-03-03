const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");
const { Sequelize } = require('../config/database');
const { animalMinAge } = require('../lib/parameters');
const Organization = require('../models/Organization')
const Model = require('../models/Animal')
const Exploration = require('../models/Exploration')
const Certification = require('../models/Certification')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const { formatDateYYYYMMDD } = require('../lib/FormatDates')
const jwt = require("jsonwebtoken");
const { verifyPermissionArray, verifyTokenPermissions } = require('../verifications/tokenVerifications');

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({
            include: [Exploration],
            order: [
                ['createdAt', 'DESC'],
                ['updatedAt', 'DESC']
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
        const request = await Model.findByPk(req.params.id, { include: [Exploration] })

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

        let request
        if (await verifyPermissionArray(tokenDecoded.permission, ['ADMIN', 'AMIBA'])) {
            request = await Model.findAll({
                include: {
                    model: Exploration
                },
                order: [
                    ['createdAt', 'DESC'],
                    ['updatedAt', 'DESC']
                ]
            })
        } else {
            request = await Model.findAll({
                include: {
                    model: Exploration,
                    attributes: ['id', 'name', 'OrganizationId'],
                    required: true,
                    include: {
                        model: Organization,
                        where: { UserId: tokenDecoded.id },
                        attributes: ['id', 'UserId']
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                    ['updatedAt', 'DESC']
                ]
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


router.get('/ExplorationId/:ExplorationId/certificated', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.ExplorationId) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        var minimumAge = await new Date(new Date());
        await minimumAge.setMonth(new Date().getMonth() - animalMinAge);

        const request = await Model.findAndCountAll({
            where:
                [
                    {
                        validated: { [Op.is]: true },
                        ExplorationId: req.params.ExplorationId,
                        birthDate: {
                            [Op.lte]: formatDateYYYYMMDD(minimumAge),
                        }
                    },
                    Sequelize.literal(
                        `"Animal"."birthDate" >= "Exploration->Certifications"."initialDate" `
                    )
                ],
            include: [{
                model: Exploration,
                attributes: ['id', 'name'],
                required: true,
                include: {
                    model: Certification,
                    required: true,
                    attributes: ['id', 'initialDate', 'finalDate'],
                    where: {
                        finalDate: { [Op.gte]: formatDateYYYYMMDD(new Date()) },
                    }
                },
            }]
        })

        if (request.count > 0) {
            response.message = success_data_exits
            response.data = request.rows
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        console.log("error", error)
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }

})

router.post('/create', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ExplorationId, lgn, lga, identifier, race, gender, birthDate, weight } = req.body

        if (!(ExplorationId && identifier && race && gender && birthDate && weight)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            ExplorationId: ExplorationId,
            identifier: identifier,
            race: race,
            gender: gender,
            birthDate: birthDate,
            weight: weight,
            lgn: lgn !== "" ? lgn : undefined,
            lga: lga !== "" ? lga : undefined,
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
        const { id, slaughterDate, slaughterWeight, slaughterLocal, breeder } = req.body

        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            slaughterDate: slaughterDate,
            slaughterWeight: slaughterWeight,
            slaughterLocal: slaughterLocal,
            breeder: breeder
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

router.put('/validate', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, validated } = req.body

        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const validPermission = await verifyTokenPermissions(req.session.token, ['ADMIN', 'AMIBA'])

        const data = {
            validated: validPermission === true ? validated : undefined,
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