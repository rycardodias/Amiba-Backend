const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Organization')
const OrganizationType = require('../models/OrganizationType')

router.get('/', (req, res) => {
    Model.findAll({include: OrganizationType})
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel obter os dados!", err: err }))
})

router.get('/id/:id', (req, res) => {
    Model.findByPk(req.params.id)
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel obter os dados!", err: err }))
})

router.post('/create', async (req, res) => {
    const { OrganizationTypeId, UserId, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    if (OrganizationTypeId == undefined || OrganizationTypeId == "") {
        res.json({ error: "Erro! Nenhum tipo foi indicado!" })
    }

    Model.create({
        OrganizationTypeId: OrganizationTypeId,
        UserId: UserId,
        name: name,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        telephone: telephone,
        mobilePhone: mobilePhone,
        fiscalNumber: fiscalNumber

    })
        .then(status => res.json({ data: status }))
        .catch(err => res.json({ error: "Erro! Não foi possivel criar a Organização!", err: err }))
})


router.put('/update', async (req, res) => {
    const { id, OrganizationTypeId, UserId, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Erro! Nenhum id foi indicado!" })
    }
    if (OrganizationTypeId == "") {
        res.json({ error: "Erro! Nenhum tipo foi indicado!" })
    }

    const data = {
        OrganizationTypeId: OrganizationTypeId,
        UserId: UserId,
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
        .catch(err => res.json({ error: "Erro! Não foi possivel eliminar o registo!", err: err }))
})

module.exports = router