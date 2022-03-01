const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const ResponseModel = require('../lib/ResponseModel')
const Model = require('../models/User')
const { error_missing_fields, error_invalid_token, error_invalid_token_or_permission, error_invalid_fields, error_data_not_found, error_admin_permission_required,
    success_row_delete, error_row_delete, success_row_update, error_row_update, error_row_create, success_row_create,
    success_token_delete, success_token_valid, success_data_exits, error_invalid_password } = require('../lib/ResponseMessages');
const { verifyTokenPermissions, validateToken } = require('../verifications/tokenVerifications');
const nodemailer = require("nodemailer");
router.get('/', async (req, res) => {
    const response = new ResponseModel()

    try {
        if (!await verifyTokenPermissions(req.session.token, ['ADMIN', 'AMIBA']) && !process.env.DEV_MODE) {
            response.message = error_invalid_token_or_permission
            response.error = error_invalid_token_or_permission
            return res.status(req.session.token ? 403 : 401).json(response)
        }

        const request = await Model.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } })

        if (request.length > 0) {
            response.message = success_data_exits
            response.data = request
            res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(200).json(response)
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
            return res.status(400).json(response)
        }

        if (!await verifyTokenPermissions(req.session.token, ['ADMIN', 'AMIBA']) && !process.env.DEV_MODE) {
            response.message = error_invalid_token_or_permission
            response.error = error_invalid_token_or_permission
            return res.status(req.session.token ? 403 : 401).json(response)
        }

        const request = await Model.findByPk(req.params.id, { attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } })

        if (request) {
            response.message = success_data_exits
            response.data = request
            return res.status(200).json(response)
        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            return res.status(200).json(response)
        }
    } catch (error) {

        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

router.post('/create', async (req, res) => {
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
            telephone: parseInt(telephone) > 0 ? telephone : undefined,
            mobilePhone: parseInt(mobilePhone) > 0 ? mobilePhone : undefined,
        }

        const request = await Model.create(data)

        response.message = success_row_create
        response.data = jwt.sign({ id: request.id, permission: request.permission }, process.env.TOKEN_SECRET)

        req.session = { token: response.data };

        const newToken = jwt.sign({ id: request.id, email: request.email }, process.env.TOKEN_SECRET)

        //https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Pm8T8M5qWHjZ_79Z-2gMMMJVOOPtaSa6_W2rxzcdbPe_HE4CNPkD0THRreigjLFCe1rbnyyxgdZxgYTEUVeNQ_QOet-Q
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'AMIBA - Validação de E-mail',
            text: `Validar email: https://shop.amiba.pt/api/users/validateEmail/${newToken}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(400).json(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.status(201).json(response)

    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.put('/update', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { token, id, name, email, password, active, permission, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = req.body

        if (!token && !process.env.DEV_MODE) {
            response.error = error_invalid_token
            res.status(400).json(response)
        }

        const isAdmin = await verifyTokenPermissions(req.session.token, ['ADMIN'])
        const idToken = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET).id

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

router.get('/forgetPassword/:email', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { email } = req.params

        const request = await Model.findOne({
            where: {
                email: email
            },
            returning: true
        })

        const newToken = jwt.sign({ id: request.id, email: request.email }, process.env.TOKEN_SECRET)

        //https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Pm8T8M5qWHjZ_79Z-2gMMMJVOOPtaSa6_W2rxzcdbPe_HE4CNPkD0THRreigjLFCe1rbnyyxgdZxgYTEUVeNQ_QOet-Q
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'AMIBA - Repor palavra-chave',
            text: `Repor palavra-chave: https://shop.amiba.pt/api/users/recoverPassword/${newToken}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(400).json(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        if (request.dataValues) {
            response.message = success_row_update
            response.data = newToken
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

router.put('/updatePermission', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, permission } = req.body

        if (!await verifyTokenPermissions(req.session.token, ['ADMIN']) && !process.env.DEV_MODE) {
            response.message = error_invalid_token_or_permission
            response.error = error_invalid_token_or_permission
            return res.status(req.session.token ? 403 : 401).json(response)
        }

        const data = {
            permission: permission !== "" ? [permission] : undefined,
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



router.put('/update/password', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, token, oldPassword, newPassword } = req.body

        if (!(id && token && oldPassword && newPassword)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const idToken = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET).id

        if (idToken != id) {
            response.message = error_invalid_token
            response.error = error_invalid_token
            return res.status(400).json(response)
        }

        const user = await Model.findByPk(id)

        if (!bcrypt.compareSync(oldPassword, user.dataValues.password)) {
            response.message = error_invalid_password
            response.error = error_invalid_password
            return res.status(200).json(response)
        }

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
            return res.status(200).json(response)
        } else {
            response.message = error_row_update
            response.error = request[0]
            return res.status(404).json(response)
        }

    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

router.get('/generateEmailValidation/:email', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { email } = req.params

        const request = await Model.findOne({
            where: {
                email: email,
                emailValidated: false
            },
            returning: true
        })
        const newToken = jwt.sign({ id: request.dataValues.id, email: email }, process.env.TOKEN_SECRET)

        //https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Pm8T8M5qWHjZ_79Z-2gMMMJVOOPtaSa6_W2rxzcdbPe_HE4CNPkD0THRreigjLFCe1rbnyyxgdZxgYTEUVeNQ_QOet-Q
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'AMIBA - Validação de E-mail',
            text: `Validar email: https://shop.amiba.pt/api/users/validateEmail/${newToken}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(400).json(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        if (request.dataValues) {
            response.message = success_row_update
            response.data = newToken
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

router.get('/validateEmail/:validationToken', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { validationToken } = req.params

        const tokenDecoded = jwt.decode(validationToken, process.env.TOKEN_SECRET)

        console.log(tokenDecoded)

        const request = await Model.update({ emailValidated: true }, {
            where: {
                id: tokenDecoded.id,
                email: tokenDecoded.email
            },
            returning: true
        })

        const values = request[1][0].dataValues

        if (request[0] === 1) {
            response.message = success_row_update
            response.data = { name: values.name, email: values.email, emailValidated: values.emailValidated }
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

router.delete('/delete', async (req, res) => {
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
            return res.status(400).json(response)
        }

        const request = await Model.findOne({ where: { email: email } })

        if (bcrypt.compareSync(password, request.password)) {
            response.message = success_data_exits
            response.data = jwt.sign({ id: request.id, permission: request.permission }, process.env.TOKEN_SECRET)

            req.session = { token: response.data };

            return res.status(200).json(response)

        } else {
            response.message = error_data_not_found
            response.error = error_data_not_found
            res.status(200).json(response)
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

router.get('/me', async (req, res) => {
    const response = new ResponseModel()

    try {
        const { token } = req.session

        if (!token && !process.env.DEV_MODE) {
            response.error = error_invalid_token
            res.status(400).json(response)
        }

        const userID = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET);
        const request = await Model.findByPk(userID.id, { attributes: ['name', 'permission', 'email'] })

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

router.get('/validateToken', async (req, res) => {
    const response = new ResponseModel()

    try {
        const { token } = req.session

        if (!token && !process.env.DEV_MODE) {
            response.error = error_invalid_token
            res.status(400).json(response)
        }

        const userID = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET);
        const request = await Model.findByPk(userID.id, { attributes: ['id', 'name', 'permission', 'email'] })

        if (request) {
            response.message = success_token_valid
            response.data = true
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

router.get('/tokenPermission', async (req, res) => {
    const response = new ResponseModel()

    try {
        const { token } = req.session

        if (!token && !process.env.DEV_MODE) {
            response.error = error_invalid_token
            res.status(400).json(response)
        }

        const userID = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET);

        response.message = success_token_valid
        response.data = userID.permission
        res.status(200).json(response)
    } catch (error) {
        response.message = error_invalid_token
        response.error = error
        return res.status(400).json(response)
    }
})

module.exports = router