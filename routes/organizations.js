const express = require('express')
const router = express.Router()
const Model = require('../models/Organization')
const OrganizationType = require('../models/OrganizationType')

const ResponseModel = require('../lib/ResponseModel')

const { error_missing_fields,
    error_invalid_fields,
    error_data_not_found,
    success_row_delete,
    error_row_delete,
    success_row_update,
    error_row_update,
    error_row_create,
    success_row_create
} = require('../lib/ResponseMessages')

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: OrganizationType })
        if (request.length > 0) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }

})

router.get('/id/:id', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id)

        if (request) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }

})

router.post('/create', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body


        if (!(OrganizationTypeId && UserId && name && address && locale && zipcode && fiscalNumber)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            OrganizationTypeId: OrganizationTypeId,
            UserId: UserId,
            name: name,
            address: address,
            locale: locale,
            zipcode: zipcode,
            telephone: telephone,
            mobilePhone: mobilePhone,
            fiscalNumber: fiscalNumber
        }

        const request = await Model.create(data)

        if (request) {
            response.message = success_row_create
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_row_create
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})


router.put('/update', async (req, res) => {
    const { id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber } = req.body

    if (!id) {
        res.json({ error: "Erro! Nenhum id foi indicado!" })
    }
    if (!OrganizationTypeId) {
        res.json({ error: "Erro! Nenhum tipo foi indicado!" })
    }

    const data = {
        OrganizationTypeId: OrganizationTypeId,
        UserId: UserId,
        name: name,
        address: address,
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
        .then(status => {
            if (status[0] === 1) {
                res.json({ data: "Dados atualizados com sucesso!" })
            } else {
                res.json({ error: "Erro! Não foi possivel atualizar os dados!" })
            }
        })

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