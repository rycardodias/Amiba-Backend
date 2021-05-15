const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Taxes')

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
    const { VATcode, percentage, description } = req.body

    Model.create({
        VATcode: VATcode,
        percentage: percentage,
        description: description
    })
        .then(status => res.send(status))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, VATcode, percentage, description } = req.body
    
    if (id == undefined || id == "") {
        res.json({error: "Error! An id must be provided!"})
    }

    const data = {
        VATcode: VATcode,
        percentage: percentage,
        description: description
    }

    Model.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => {
            status == 1
                ? res.json({ data: "Tax updated sucessfuly" })
                : res.json({ error: "The taxes can not be updated!" })
        })
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