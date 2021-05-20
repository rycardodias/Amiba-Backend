const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Recipe')

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
    const { restaurant, name, description } = req.body

    Model.create({
        restaurant: restaurant,
        name: name,
        description: description
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, restaurant, name, description } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        restaurant: restaurant,
        name: name,
        description: description
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