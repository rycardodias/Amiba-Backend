const Users = require('../models/User')
const jwt = require("jsonwebtoken");
const { permissions } = require('./permissions')
let res;
exports.verifyPermission = async function (token) {
    let idToken = ''
    try {
        idToken = jwt.verify(token, "MySecret")
    } catch {
        return ('The token is invalid!')
    }

    await Users.findOne({
        where: {
            id: idToken.userId
        }
    }).then(status => {
        if (!status) {
            console.log('The token is invalid!')
        }
        res = status.permission

    }
    ).catch(err => { return err })
    return res
}
