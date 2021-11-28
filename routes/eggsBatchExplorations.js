const express = require('express')
const router = express.Router()

const Model = require('../models/EggsBatchExploration')
const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const Exploration = require('../models/Exploration')

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: Exploration })
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

//FIXME isto precisa de FIX
router.get('/id/:ExplorationId/:EggsBatchId', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ExplorationId, EggsBatchId } = req.params
        if (!(ExplorationId && EggsBatchId)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findOne({ where: { ExplorationId: ExplorationId, EggsBatchId: EggsBatchId }, include: Exploration })
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
        const { ExplorationId, EggsBatchId, quantity } = req.body

        if (!(ExplorationId && EggsBatchId && quantity)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            ExplorationId: ExplorationId,
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

router.put('/update', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { ExplorationId, EggsBatchId, quantity } = req.body

        if (!(ExplorationId && EggsBatchId)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            ExplorationId: ExplorationId,
            EggsBatchId: EggsBatchId,
            quantity: quantity,
        }

        const request = await Model.update(data, {
            where: { ExplorationId: ExplorationId, EggsBatchId: EggsBatchId },
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
        const { ExplorationId, EggsBatchId } = req.body
        if (!(ExplorationId && EggsBatchId)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await Model.destroy({ where: { ExplorationId: ExplorationId, EggsBatchId: EggsBatchId } })

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