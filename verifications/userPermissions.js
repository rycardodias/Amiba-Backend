const Users = require('../models/User')
const jwt = require("jsonwebtoken");
const { permissions } = require('./permissions')

exports.convertToToken = async function (id) {
    const token = jwt.sign({ id: id }, "MySecret")
    return token
}


exports.verifyPermission = async function (token) {
    let idToken = ''
    try {
        idToken = jwt.verify(token, "MySecret").id
    } catch {
        return ('The token is invalid!')
    }

    let result = await Users.findOne({
        where: {
            id: idToken
        }
    }).then(status => {
        if (!status) {
            console.log('The user does not exists!')
        }
        return [status.id, status.permission]

    }
    ).catch(err => { return err })

    return result
}
