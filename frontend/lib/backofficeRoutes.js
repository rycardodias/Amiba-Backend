const routes = [
    // ORGANIZATIONS
    {
        route: '/backoffice',
        nextRoute: '/backoffice/organizations',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Organizações',
        description: 'Gestão de Organizações',

    },
    {
        route: '/backoffice/organizations',
        nextRoute: '/backoffice/organizations/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Organizações',
        description: '',

    },
    {
        route: '/backoffice/organizations',
        nextRoute: '/backoffice/organizations/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Organização',
        description: '',

    },
    {
        route: '/backoffice/organizations',
        nextRoute: '/backoffice/organizations/organizationTypes',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Organizações',
        description: '',

    },
    // ORGANIZATIONS/ORGANIZATION TYPES
    {
        route: '/backoffice/organizations/organizationTypes',
        nextRoute: '/backoffice/organizations/organizationTypes/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Tipos',
        description: '',
    },
    {
        route: '/backoffice/organizations/organizationTypes',
        nextRoute: '/backoffice/organizations/organizationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Tipos',
        description: '',
    },


    // EXPLORATIONS
    {
        route: '/backoffice',
        nextRoute: '/backoffice/explorations',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Explorações',
        description: 'Gestão de Organizações',

    },
    {
        route: '/backoffice/explorations',
        nextRoute: '/backoffice/explorations/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Explorações',
        description: '',

    },
    {
        route: '/backoffice/explorations',
        nextRoute: '/backoffice/explorations/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Explorações',
        description: '',

    },
    {
        route: '/backoffice/explorations',
        nextRoute: '/backoffice/explorations/explorationTypes',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Explorações',
        description: '',

    },
    // EXPLORATION/EXPLORATION TYPES
    {
        route: '/backoffice/explorations/explorationTypes',
        nextRoute: '/backoffice/explorations/explorationTypes/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Tipos',
        description: '',
    },
    {
        route: '/backoffice/explorations/explorationTypes',
        nextRoute: '/backoffice/explorations/explorationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Tipos',
        description: '',
    },

    //USERS
    {
        route: '/backoffice',
        nextRoute: '/backoffice/users',
        permission: ['ADMIN'],
        title: 'Utilizadores',
        description: 'Gestão de Utilizadores',

    },

    //ORDERS
    {
        route: '/backoffice',
        nextRoute: '/backoffice/orders',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Encomendas',
        description: 'Gestão de Encomendas',

    },

    //RESTAURANTS
    {
        route: '/backoffice',
        nextRoute: '/backoffice/restaurants',
        permission: ['ADMIN','AMIBA'],
        title: 'Restaurantes',
        description: 'Gestão de Restaurantes',

    },

    //RESTAURANTS/MENUS
    {
        route: '/backoffice/restaurants',
        nextRoute: '/backoffice/restaurants', //TODO
        permission: ['ADMIN','AMIBA'],
        title: 'Menus',
        description: 'Gestão de Menus',

    },
]


export { routes }