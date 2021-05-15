const express = require('express')
const router = express.Router()
const db = require('../config/database')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions')

const Model = require('../models/User')

router.get('/', (req, res) => {
    Model.findAll()
        .then(status => res.json({data: status}))
        .catch(err => res.json({error: err}))
})

router.get('/id/:id', (req, res) => {
    Model.findByPk(req.params.id)
        .then(status => res.json({data: status}))
        .catch(err => res.json({error: err}))
})

router.post('/create', async (req, res) => {
    const { name, surname, email, password, organization, address, locale, zipcode, fiscalNumber } = req.body

    Model.create({
        name: name,
        surname: surname,
        email: email,
        password: bcrypt.hashSync(password, 10),
        organization: organization,
        address: address,
        locale: locale,
        zipcode: zipcode,
        fiscalNumber: fiscalNumber

    })
        .then(status => {
            const token = jwt.sign({ id: status.id, }, "MySecret")
            res.json({data: token})
        })
        .catch(err => res.json({error: err}))
})


router.put('/update', async (req, res) => {
    const { token, id, name, surname, email, password, active, permission, organization, address, locale, zipcode, fiscalNumber } = req.body

    if (!token) {
        return res.json({ error: "Token must be provided!" })
    }

    const tokenData = await userPermission.verifyPermission(token)
    if (tokenData[1] !== 'ADMIN' && tokenData[0] !== id) {
        return res.json({ error: "Administrator permission is required!" })
    }

    tokenData[1] === 'ADMIN' ? userId = id : userId = tokenData[0]

    const data = {
        name: name,
        surname: surname,
        email: email,
        password: password ? bcrypt.hashSync(password, 10) : undefined,
        active: tokenData[1] === 'ADMIN' ? active : undefined,
        permission: tokenData[1] === 'ADMIN' ? permission : undefined,
        organization: tokenData[1] === 'ADMIN' ? organization : undefined,
        address: address,
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
        .then(status => {
            status == 1
                ? res.json({ data: "User updated sucessfuly" })
                : res.json({ error: "The user can not be updated!" })
        })
        .catch(err => res.json({error: err}))
})

router.delete('/delete', async (req, res) => {
    const { token, id } = req.body

    const tokenData = await userPermission.verifyPermission(token)
    if (tokenData[1] !== 'ADMIN') {
        return res.json({ error: "Administrator permission is required!" })
    }
    Model.destroy({
        where: {
            id: id
        },
    })
        .then(status => {
            status == 1
                ? res.json({ data: "User deleted sucessfuly" })
                : res.json({ error: "The user does not exists!" })
        })
        .catch(err => res.json({error: err}))
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body

    Model.findOne({
        where: {
            email: email
        }
    })
        .then(status => {
            if (!status) {
                 return res.json({ error: "Invalid email or password!" })
            }
        
            if (bcrypt.compareSync(password, status.password)) {
                const token = jwt.sign({ id: status.id, }, "MySecret");
                return res.json({data: token})
            } else {
                return res.json({ error: "Invalid email or password!" })
            }
        }
        )
        .catch(err => res.json({error: err}))
})

router.post('/me', async (req, res) => {
if(!req.body.token){
    return res.json({ error: "No Token" })
}
let userID;
try {
     userID = jwt.verify(req.body.token, "MySecret");
  
} catch (error) {
    return res.json({ error: error })
}

    Model.findByPk(userID.id)
        .then(status => res.json({data: status}))
        .catch(err => res.json({error: err}))
})

module.exports = router