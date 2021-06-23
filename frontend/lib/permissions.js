
const verifyPermission = (perm1, perm2) => {
    for (let i = 0; i < perm1.length; i++) {
        for(let j=0; j<perm2.length; j++) {
            if(perm1[i]==perm2[j]) {
                return true
            }
        }
    }
    return false
}

const urlPermissions = [
    {
        url: "backoffice",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "teste2",
        permission: ["BANANA" ]
    }
]

export { verifyPermission, urlPermissions }