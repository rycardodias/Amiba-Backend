
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
        url: "/backoffice",
        permission: ["ADMIN", "AMIBA"]
    },
    //organizations/
    {
        url: "/backoffice/organizations",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/organizations/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/organizations/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/organizations/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },
    //organizations/organizationTypes
    { 
        url: "/backoffice/organizations/organizationTypes",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/organizations/organizationTypes/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/organizations/organizationTypes/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/organizations/organizationTypes/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },
]

export { verifyPermission, urlPermissions }