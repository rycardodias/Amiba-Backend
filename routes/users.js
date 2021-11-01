const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions')
const ResponseModel = require('../lib/ResponseModel')
const Model = require('../models/User')
const { error_missing_fields,
    error_invalid_token,
    error_invalid_fields,
    error_data_not_found,
    error_admin_permission_required,
    success_row_delete,
    error_row_delete,
    success_row_update,
    error_row_update,
    error_row_create,
    success_row_create,
    success_token_delete,
    success_token_valid,
    success_data_exits
} = require('../lib/ResponseMessages')

const cache = require('../lib/cache/routeCache')
const removeCache = require('../lib/cache/removeCache');
const { response } = require('express');

router.get('/', cache(), async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll()
        if (request.length > 0) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
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
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id)

        if (request) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

router.post('/create', removeCache(['/users']), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = req.body

        if (!(name && email && password)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            address: address,
            locale: locale,
            zipcode: zipcode,
            fiscalNumber: fiscalNumber,
            telephone: telephone,
            mobilePhone: mobilePhone
        }

        const request = await Model.create(data)

        if (request) {
            response.message = success_row_create
            response.data = jwt.sign({ id: request.id, }, "MySecret")
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


router.put('/update', removeCache(['/users/me', '/users']), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { token, id, name, email, password, active, permission, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = req.body

        if (!token) {
            response.error = error_invalid_token
            res.status(400).json(response)
        }

        const isAdmin = await userPermission.verifyPermission(token, ['ADMIN'])
        const idToken = jwt.verify(token, "MySecret").id

        if (!isAdmin && (idToken != id)) {
            response.error = error_admin_permission_required
            res.status(403).json(response)
            return
        }

        isAdmin ? userId = id : userId = idToken

        const data = {
            name: name,
            email: email,
            password: password ? bcrypt.hashSync(password, 10) : undefined,
            active: isAdmin ? active : undefined,
            permission: isAdmin ? permission : undefined,
            address: address,
            locale: locale,
            zipcode: zipcode,
            fiscalNumber: fiscalNumber,
            telephone: telephone,
            mobilePhone: mobilePhone
        }

        const request = await Model.update(data, {
            where: { id: userId },
            returning: true
        })

        if (request[0] === 1) {
            response.message = success_row_update
            response.data = request[1][0].dataValues
            res.status(200).json(response)
        } else {
            response.message = error_row_update
            response.error = request[0]
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.put('/update/password', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, token, oldPassword, newPassword } = req.body

        if (!(id && token && oldPassword && newPassword)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const idToken = jwt.verify(token, "MySecret").id

        if (idToken != id) {
            response.message = error_invalid_token
            response.error = error_invalid_token
            res.status(400).json(response)
        }

        // const res = await Model.findByPk(id)
        //     .then((data) => res.status(200).json(data))
        //     .catch((error) => res.status(200).json("erro", error))
        //FIXME não está a validar password antiga

        const data = {
            password: bcrypt.hashSync(newPassword, 10)
        }

        const request = await Model.update(data, {
            where: { id: id },
            returning: true
        })

        if (request[0] === 1) {
            response.message = success_row_update
            response.data = request[1][0].dataValues
            res.status(200).json(response)
        } else {
            response.message = error_row_update
            response.error = request[0]
            res.status(404).json(response)
        }

    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.delete('/delete', removeCache(['/users', '/users/me']), async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id } = req.body
        if (!id) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await Model.destroy({ where: { id: id } })

        if (request === 1) {
            response.message = success_row_delete
            response.data = success_row_delete
            res.status(200).json(response)
        } else {
            response.message = error_row_delete
            response.error = error_row_delete
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})




router.post('/login', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findOne({ where: { email: email } })

        if (bcrypt.compareSync(password, request.password)) {

            response.data = jwt.sign({ id: request.id, }, "MySecret")

            req.session = { token: response.data };

            res.status(200).json(response)

        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})


router.post('/logout', async (req, res) => {
    const response = new ResponseModel()
    try {
        req.session = null;

        response.message = success_token_delete
        response.data = success_token_delete
        res.status(200).json(response)
    } catch (error) {
        response.message = error_data_not_found
        response.error = error_invalid_token
        return res.status(400).json(response)
    }
})

router.get('/me/:token', async (req, res) => {
    const response = new ResponseModel()

    try {
        const userID = jwt.verify(req.session.token || req.params.token, "MySecret");
        const request = await Model.findByPk(userID.id, { attributes: ['id', 'name', 'permission'] })

        if (request) {
            response.message = success_token_valid
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_invalid_token
            response.error = error_invalid_token
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_token
        response.error = error_invalid_token
        return res.status(400).json(response)
    }
})

module.exports = router