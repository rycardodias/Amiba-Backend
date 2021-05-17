const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Organization')
const OrganizationType = require('../models/OrganizationType')

router.get('/', (req, res) => {
    Model.findAll()
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel obter os dados!", err: err }))
})

router.get('/id/:id', (req, res) => {
    Model.findByPk(req.params.id)
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel obter os dados!", err: err }))
})

router.post('/create', async (req, res) => {
    const { type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    if (type == undefined || type == "") {
        res.json({ error: "Erro! Nenhum tipo foi indicado!" })
    }

    await OrganizationType.findByPk(type)
        .then(status => { typeDescription = status.name })
        .catch(err => res.json({ error: "Erro! O tipo de organização não existe!", err: err }))

    Model.create({
        type: type,
        typeDescription: type != undefined ? typeDescription : undefined,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
        fiscalNumber: fiscalNumber

    })
        .then(status => res.send(status))
        .catch(err => res.json({ error: "Erro! Não foi possivel criar a Organização!", err: err }))
})


router.put('/update', async (req, res) => {
    const { id, type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Erro! Nenhum id foi indicado!" })
    }
    if (type == "") {
        res.json({ error: "Erro! Nenhum tipo foi indicado!" })
    }

    if (type != undefined) {
        await OrganizationType.findByPk(type)
            .then(status => { typeDescription = status.name })
            .catch(err => res.json({ error: "Erro! O Tipo de Organização não existe!", err: err }))
    }

    const data = {
        type: type,
        typeDescription: type != undefined ? typeDescription : undefined,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
        fiscalNumber: fiscalNumber
    }

    Model.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel atualizar os dados!", err: err }))
})

router.delete('/delete', (req, res) => {
    const { id } = req.body

    Model.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel eliminar os dados!", err: err }))
})

module.exports = router