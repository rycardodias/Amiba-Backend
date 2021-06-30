const routes = [
    // ORGANIZATIONS
    {
        title: '',
        route: '/backoffice',
        nextRoute: '/backoffice/organizations',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Organizações',
        description: 'Gestão de Organizações',

    },
    {
        title: 'Organizações',
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
        title: 'Listar Tipos Organizações',
        description: '',
    },
    {
        route: '/backoffice/organizations/organizationTypes',
        nextRoute: '/backoffice/organizations/organizationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Tipo Organização',
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
        title: 'Criar Exploração',
        description: '',

    },
    {
        route: '/backoffice/explorations',
        nextRoute: '/backoffice/explorations/explorationTypes',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Tipos Explorações',
        description: '',

    },
    {
        route: '/backoffice/explorations',
        nextRoute: '/backoffice/explorations/certifications',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Certificações',
        description: '',

    },
    // EXPLORATION/EXPLORATION TYPES
    {
        route: '/backoffice/explorations/explorationTypes',
        nextRoute: '/backoffice/explorations/explorationTypes/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Tipos Explorações',
        description: '',
    },
    {
        route: '/backoffice/explorations/explorationTypes',
        nextRoute: '/backoffice/explorations/explorationTypes/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Tipo Exploração',
        description: '',
    },
    // EXPLORATION/CERTIFICATIONS
    {
        route: '/backoffice/explorations/certifications',
        nextRoute: '/backoffice/explorations/certifications/list',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Listar Certificações',
        description: '',
    },
    {
        route: '/backoffice/explorations/certifications',
        nextRoute: '/backoffice/explorations/certifications/create',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Criar Certificação',
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
    {
        route: '/backoffice/users',
        nextRoute: '/backoffice/users/list',
        permission: ['ADMIN'],
        title: 'Lista de Utilizadores',
        description: '',

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

    //ORDERS
    {
        route: '/backoffice',
        nextRoute: '/backoffice/orders',
        permission: ['ADMIN', 'AMIBA'],
        title: 'Encomendas',
        description: 'Gestão de Encomendas',

    },
]


export { routes }