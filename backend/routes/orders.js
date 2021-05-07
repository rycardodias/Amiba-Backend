const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Order')

router.get('/', (req, res) => {
    Model.findAll()
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.get('/id', (req, res) => {
    Model.findByPk(req.headers.id)
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { user, total, totalVAT, adress, locale, zipcode, observation, fiscalNumber } = req.body

    Model.create({
        user: user,
        total: total,
        totalVAT: totalVAT,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        observation: observation,
        fiscalNumber: fiscalNumber

    })
        .then(status => res.send(status))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, user, total, totalVAT, adress, locale, zipcode, observation, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        user: user,
        total: total,
        totalVAT: totalVAT,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        observation: observation,
        fiscalNumber: fiscalNumber
    }

    Model.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.delete('/delete', (req, res) => {
    const { id } = req.body

    Model.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json(status))
})

module.exports = router