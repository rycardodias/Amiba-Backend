const routes = [
    // ORGANIZATIONS
    {
        route: '',
        nextRoute: 'backoffice/organizations',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Organizações',
        description: 'Gestão de Organizações',

    },
    {
        route: 'backoffice/organizations',
        nextRoute: 'organizations/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar \nOrganizações',
        description: '',

    },
    {
        route: 'backoffice/organizations',
        nextRoute: 'organizations/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Organização',
        description: '',

    },
    {
        route: 'backoffice/organizations',
        nextRoute: 'organizations/OrganizationTypes/',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Organizações',
        description: '',

    },
    {
        route: 'organizations/OrganizationTypes',
        nextRoute: 'backoffice/organizations/OrganizationTypes/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Organizações',
        description: '',
    },
    {
        route: 'organizations/OrganizationTypes',
        nextRoute: 'backoffice/organizations/OrganizationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Organizações',
        description: '',
    },


    // EXPLORATIONS
    {
        route: '',
        nextRoute: 'backoffice/explorations',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Explorações',
        description: 'Gestão de Explorações',

    },
]

export { routes }