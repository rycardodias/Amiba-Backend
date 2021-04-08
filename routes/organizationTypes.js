const express = require('express')
const router = express.Router()
const db = require('../config/database')

const OrganizationType = require('../models/OrganizationType')

router.get('/', (req, res) => {
    OrganizationType.findAll()
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.get('/id', (req, res) => {
    OrganizationType.findByPk(req.headers.id)
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { name, description } = req.body

    OrganizationType.create({
        name: name,
        description: description,
    })
        .then(status => res.send(status))
        .catch(err => res.send(err))
})

router.post('/update', (req, res) => {
    const { id, name, description } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        name: name,
        description: description,
    }

    OrganizationType.update(data,
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

    OrganizationType.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json(status))
})

module.exports = router