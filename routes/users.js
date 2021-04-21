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

router.post('/create', (req, res) => {
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
        .then(status => res.send(status))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { id, name, surname, email, password, active, permission, organization, adress, locale, zipcode, fiscalNumber } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
    }

    const data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
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
                id: id
            },
        })
        .then(status => res.send(status))
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


router.get ('/login', async (req, res) => {
    const { email, password, token } = req.body
    const valor =  await userPermission.verifyPermission(token)
    console.log("valor",valor)
    Model.findOne({
        where: {
            email: email
        }
    })
        .then(status => {
            if(!status) {
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


// const token = jwt.sign(
//     {
//       userId: res.key,
//     },
//     "MySecret"
//   );

module.exports = router