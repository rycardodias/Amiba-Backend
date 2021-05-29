const routes = [
    // ORGANIZATIONS
    {
        level: '',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Organizações',
        description: 'Gestão de Organizações',
        nextLevel: 'organizations/'
    },
    {
        level: 'organizations/',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/list',
        title: 'Listar Organizações',
        description: '',
        nextLevel: 'organizations/list'
    },
    {
        level: 'organizations/',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/create',
        title: 'Criar Organização',
        description: '',
        nextLevel: 'organizations/create'
    },
    {
        level: 'organizations/',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/manage',
        title: 'Gerir Organização',
        description: '',
        nextLevel: 'organizations/manage'
    },
    {
        level: 'organizations/',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Tipos Organizações',
        description: '',
        nextLevel: 'organizations/'
    },
    

    // EXPLORATIONS
    {
        level: '',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Explorações',
        description: 'Gestão de Explorações',
        nextLevel: 'explorations/'
    },
]

export {routes}