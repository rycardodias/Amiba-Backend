const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Organization')

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
    const { type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    Model.create({
        type: type,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
        fiscalNumber: fiscalNumber

    })
        .then(status => res.send(status))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        type: type,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
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