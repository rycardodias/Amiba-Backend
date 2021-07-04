const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Animal')
const Race = require('../models/Race')
const Exploration = require('../models/Exploration')

const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')

router.get('/', (req, res) => {
    Model.findAll()
        .then(status => res.json({ data: status }))
        .catch(err => console.log(err))
})

router.get('/id/:id', (req, res) => {
    Model.findByPk(req.params.id)
        .then(status => res.json({ data: status }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { animalCode, ExplorationId, RaceId, gender, birthDate, weight, slaughterDate, slaughterWeight, slaughterLocal } = req.body

    Model.create({
        animalCode: animalCode,
        ExplorationId: ExplorationId,
        RaceId: RaceId,
        gender: gender,
        birthDate: birthDate,
        weight: weight,
        slaughterDate: slaughterDate,
        slaughterWeight: slaughterWeight,
        slaughterLocal: slaughterLocal
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, animalCode, ExplorationId, RaceId, gender, birthDate, weight, slaughterDate, slaughterWeight, slaughterLocal } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        animalCode: animalCode,
        ExplorationId: ExplorationId,
        RaceId: RaceId,
        gender: gender,
        birthDate: birthDate,
        weight: weight,
        slaughterDate: slaughterDate,
        slaughterWeight: slaughterWeight,
        slaughterLocal: slaughterLocal
    }

    Model.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => res.json({ data: status }))
        .catch(err => console.log(err))
})

router.delete('/delete', (req, res) => {
    const { id } = req.body

    Model.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.json({error: "Erro! Não foi possivel eliminar o registo!", err: err}))
})

module.exports = router