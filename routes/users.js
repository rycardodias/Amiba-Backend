const express = require('express')
const router = express.Router()
const db = require('../config/database')

const User = require('../models/User')

//get all
router.get('/', (req, res) => {
    console.log(req.params)
    User.findAll()
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

//getById
router.get('/id', (req, res) => {
    User.findByPk(req.headers.id)
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

//create
router.post('/create', (req, res) => {
    const { name, surname, password, active } = req.body

    User.create({
        name: name,
        surname: surname,
        password: password,
        active: active,
    })
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.post('/update', (req, res) => {
    const { id, name, surname, password, active } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        name: name,
        surname: surname,
        password: password,
        active: active,
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

//create user
router.delete('/delete', (req, res) => {
    const { id } = req.body

    User.destroy({
        where: {
            id: id
        },
        force: true
    })
        .then(status => res.json(status))
})

module.exports = router