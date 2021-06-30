const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Menu')
const Restaurant = require('../models/Restaurant')

router.get('/', (req, res) => {
    Model.findAll({ include: [Restaurant] })
        .then(status => res.json({ data: status }))
        .catch(err => console.log(err))
})

router.get('/id/:id', (req, res) => {
    Model.findByPk(req.params.id, { include: [Restaurant] })
        .then(status => res.json({ data: status }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { RestaurantId, title, description, image, active } = req.body

    Model.create({
        RestaurantId: RestaurantId,
        title: title,
        description: description,
        image: image,
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, RestaurantId, title, description, image, active } = req.body

    if (!id) {
        res.json({error: "Error! An id must be provided!"})
    }

    const data = {
        RestaurantId: RestaurantId,
        title: title,
        description: description,
        image: image,
        active: active,
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
        .catch(err => res.json({ error: "Erro! Não foi possivel eliminar o registo!", err: err }))
})

module.exports = router