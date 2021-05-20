const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Exploration')

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
    const { organization, type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization } = req.body

    Model.create({
        organization: organization,
        type: type,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
        fiscalNumber: fiscalNumber,
        gpsLocalization: gpsLocalization

    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, organization, type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        organization: organization,
        type: type,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
        fiscalNumber: fiscalNumber,
        gpsLocalization: gpsLocalization
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
        .then(status => res.json(status))
        .catch(err => res.json({error: "Erro! Não foi possivel eliminar o registo!", err: err}))
})

module.exports = router