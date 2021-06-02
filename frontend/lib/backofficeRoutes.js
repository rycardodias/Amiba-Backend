const routes = [
    // ORGANIZATIONS
    {
        previousLevel: '',
        nextLevel: 'organizations/',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Organizações',
        description: 'Gestão de Organizações',
        
    },
    {
        previousLevel: 'organizations/',
        nextLevel: 'organizations/list',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/list',
        title: 'Listar Organizações',
        description: '',
        
    },
    {
        previousLevel: 'organizations/',
        nextLevel: 'organizations/create',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/create',
        title: 'Criar Organização',
        description: '',
        
    },
    {
        previousLevel: 'organizations/',
        nextLevel: 'organizations/manage',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/manage',
        title: 'Gerir Organização',
        description: '',
        
    },
    {
        previousLevel: 'organizations/',
        nextLevel: 'organizations/OrganizationTypes/',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Tipos Organizações',
        description: '',
       
    },
    {
        previousLevel: 'organizations/OrganizationTypes/',
        nextLevel: 'organizations/OrganizationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Tipos Organizações',
        description: '',
       
    },
    

    // EXPLORATIONS
    {
        previousLevel: '',
        nextLevel: 'explorations/',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Explorações',
        description: 'Gestão de Explorações',
        
    },
]


export {routes}