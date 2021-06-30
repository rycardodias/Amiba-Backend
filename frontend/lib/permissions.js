
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
    //ORGANIZATIONS/
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
    //ORGANIZATIONS/organizationTypes
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



    //EXPLORATIONS/
    {
        url: "/backoffice/explorations",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },
    //explorations/explorationTypes
    { 
        url: "/backoffice/explorations/explorationTypes",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/explorationTypes/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/explorationTypes/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/explorationTypes/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },
     //EXPLORATIONS/certifications
     { 
        url: "/backoffice/explorations/certifications",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/certifications/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/certifications/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/explorations/certifications/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },


    //USERS/
    {
        url: "/backoffice/users",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/users/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/users/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },


    //RESTAURANTS/
    {
        url: "/backoffice/restaurants",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/restaurants/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/restaurants/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/restaurants/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },
    //RESTAURANTS/MENUS
    { 
        url: "/backoffice/restaurants/menus",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/restaurants/menus/list",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/restaurants/menus/create",
        permission: ["ADMIN", "AMIBA"]
    },
    {
        url: "/backoffice/restaurants/menus/update/[id]",
        permission: ["ADMIN", "AMIBA"]
    },
]

export { verifyPermission, urlPermissions }