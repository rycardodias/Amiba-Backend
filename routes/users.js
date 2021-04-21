const express = require('express')
const router = express.Router()
const db = require('../config/database')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions')

const Model = require('../models/User')

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

router.post('/create', async (req, res) => {
    const { name, surname, email, password, organization, adress, locale, zipcode, fiscalNumber } = req.body

    Model.create({
        name: name,
        surname: surname,
        email: email,
        password: bcrypt.hashSync(password, 10),
        organization: organization,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber

    })
        .then(status => {
            const token = jwt.sign({
                userId: status.id,
            },
                "MySecret"
            )
            console.log(status.id + token)
            res.send(token)
        })
        .catch(err => res.send(err))
})


router.put('/update', async (req, res) => {
    const { token, id, name, surname, email, password, active, permission, organization, adress, locale, zipcode, fiscalNumber } = req.body

    if (!token) {
        return res.send("Error! Token must be provided!")
    }

    const tokenData = await userPermission.verifyPermission(token)
    if (tokenData[1] !== 'ADMIN' && tokenData[0] !== id) {
        return res.send("Error! Administrator permission is required!")
    }
    let userId

    if (tokenData[1] !== 'ADMIN') {
        userId = tokenData[0]
    } else {
        userId = id
    }

    const data = {
        name: name,
        surname: surname,
        email: email,
        password: bcrypt.hashSync(password, 10),
        active: active,
        permission: permission,
        organization: organization,
        adress: adress,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber
    }

    Model.update(data,
        {
            where: {
                id: userId
            },
        })
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.delete('/delete', async (req, res) => {
    const { token, id } = req.body

    const tokenData = await userPermission.verifyPermission(token)
    if (tokenData[1] !== 'ADMIN' || tokenData[0] === id) {
        return res.send("Error! Administrator permission is required!")
    }

    Model.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.send(status))
})


router.get('/login', async (req, res) => {
    const { email, password } = req.body

    Model.findOne({
        where: {
            email: email
        }
    })
        .then(status => {
            if (!status) {
                res.send("This email does not exists!")
            }
            if (bcrypt.compareSync(password, status.password)) {
                const token = jwt.sign({
                    userId: status.id,
                },
                    "MySecret"
                );
                res.send(token)
            } else {
                res.send("Invalid email or password!")
            }
        }
        )
        .catch(err => console.log(err))
})

module.exports = router