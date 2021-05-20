const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Certification')

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
    const { exploration, certificationCode, initialDate, finalDate, description } = req.body

    Model.create({
        exploration: exploration,
        certificationCode: certificationCode,
        initialDate: initialDate,
        finalDate: finalDate,
        description: description
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, exploration, certificationCode, initialDate, finalDate, description } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        exploration: exploration,
        certificationCode: certificationCode,
        initialDate: initialDate,
        finalDate: finalDate,
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
        .then(status => res.json({ data: status }))
        .catch(err => res.json({error: "Erro! Não foi possivel eliminar o registo!", err: err}))
})

module.exports = router