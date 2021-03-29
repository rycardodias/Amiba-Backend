const express = require('express')
const router = express.Router()
const db = require('../config/database')
const { v4: uuidv4 } = require("uuid")

const User = require('../models/User')

//get all
router.get('/', (req, res) => {
    console.log(req.params)
    User.findAll()
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.get('/id', (req, res) => {
    User.findByPk(req.headers.id)
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

//create user
router.post('/create', (req, res) => {
    const { name, surname, password, active } = req.body

    User.create({
        id: uuidv4(),
        name: name,
        surname: surname,
        password: password,
        active: active,
    })
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

//create user
router.delete('/delete', (req, res) => {
    const { id } = req.body

    User.destroy({
        where: {
            id: 1
        },
        force: true
    })
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

module.exports = router