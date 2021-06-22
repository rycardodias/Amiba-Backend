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
        nextRoute: 'organizations/organizationTypes',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Organizações',
        description: '',

    },
    // ORGANIZATIONS/ORGANIZATION TYPES
    {
        route: 'backoffice/organizations/organizationTypes',
        nextRoute: '/backoffice/organizations/OrganizationTypes/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Tipos',
        description: '',
    },
    {
        route: 'backoffice/organizations/organizationTypes',
        nextRoute: '/backoffice/organizations/organizationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Tipos',
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

    //USERS
    {
        route: '',
        nextRoute: 'backoffice/users',
        permission: ['ADMIN'],
        title: 'Utilizadores',
        description: 'Gestão de Utilizadores',

    },

    //ORDERS
    {
        route: '',
        nextRoute: 'backoffice/orders',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Encomendas',
        description: 'Gestão de Encomendas',

    },

    //RESTAURANTS
    {
        route: '',
        nextRoute: 'backoffice/restaurants',
        permission: ['ADMIN','AMIBA'],
        title: 'Restaurantes',
        description: 'Gestão de Restaurantes',

    },

    //RESTAURANTS/MENUS
    {
        route: 'backoffice/restaurants',
        nextRoute: 'backoffice/restaurants/', //TODO
        permission: ['ADMIN','AMIBA'],
        title: 'Menus',
        description: 'Gestão de Menus',

    },
]


export { routes }