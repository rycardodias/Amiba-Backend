
const jwt = require("jsonwebtoken");

const verifyPermissionArray = (perm1, perm2) => {
    for (let i = 0; i < perm1.length; i++) {
        for (let j = 0; j < perm2.length; j++) {
            if (perm1[i] === perm2[j]) {
                return true
            }
        }
    }
    return false
}

const verifyTokenPermissions = async (token, permission) => {
    try {
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET)
        const result = await verifyPermissionArray(decodedToken.permission, permission)

        if (!result) return false

        return true
    } catch (error) {
        return false
    }
}

const validateToken = async (token) => {
    try {
        return await jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (error) {
        return
    }

}


module.exports = { verifyTokenPermissions, validateToken, verifyPermissionArray }