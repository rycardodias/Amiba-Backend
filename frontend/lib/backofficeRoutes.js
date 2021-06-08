const routes = [
    // ORGANIZATIONS
    {
        route: '',
        nextRoute: '/backoffice/organizations',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Organizações',
        description: 'Gestão de Organizações',

    },
    {
        route: 'organizations/',
        nextRoute: 'organizations/list',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/list',
        title: 'Listar Organizações',
        description: '',

    },
    {
        route: 'organizations/',
        nextRoute: 'organizations/create',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/create',
        title: 'Criar Organização',
        description: '',

    },
    {
        route: 'organizations/',
        nextRoute: 'organizations/manage',
        permission: ['ADMIN', 'AMIBA'],
        route: 'backoffice/organizations/manage',
        title: 'Gerir Organização',
        description: '',

    },
    {
        route: 'organizations/',
        nextRoute: 'organizations/OrganizationTypes/',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Tipos Organizações',
        description: '',

    },
    {
        route: 'organizations/OrganizationTypes/',
        nextRoute: 'organizations/OrganizationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Tipos Organizações',
        description: '',

    },


    // EXPLORATIONS
    {
        route: '',
        nextRoute: '/backoffice/explorations',
        permission: ['ADMIN', 'AMIBA'],
        route: '',
        title: 'Explorações',
        description: 'Gestão de Explorações',

    },
]

export { routes }