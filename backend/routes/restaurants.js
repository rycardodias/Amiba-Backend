const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Restaurant')

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
    const { UserId, name, description, address, locale, zipcode, fiscalNumber } = req.body

    Model.create({
        UserId: UserId,
        name: name,
        description: description,
        address: address,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber

    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', (req, res) => {
    const { id, UserId, name, description, address, locale, zipcode, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        UserId: UserId,
        name: name,
        description: description,
        address: address,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber
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