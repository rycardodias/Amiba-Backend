const express = require('express')
const router = express.Router()
const db = require('../config/database')

const User = require('../models/User')

router.get('/', (req, res) => {
    User.findAll()
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.get('/id', (req, res) => {
    User.findByPk(req.headers.id)
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { name, surname, email, password, organization, adress, locale, zipcode, fiscalNumber } = req.body

    User.create({
        name: name,
        surname: surname,
        email: email,
        password: password,
        organization: organization,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber

    })
        .then(status => res.send(status))
        .catch(err => res.send(err))
})

router.put('/update', (req, res) => {
    const { id, name, surname, email, password, active, organization, adress, locale, zipcode, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        active: active,
        organization: organization,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber
    }

    User.update(data,
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

    User.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json(status))
})

module.exports = router