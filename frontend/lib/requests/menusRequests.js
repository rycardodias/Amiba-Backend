import { sendRequest } from '../requests'

const getMenus = async () => {
    return await sendRequest('GET', 'menus');
};


const getMenuId = async (id) => {
    return await sendRequest('GET', 'menus/id/' + id);
};

const createMenu = async (RestaurantId, title, description, image) => {
    return await sendRequest('POST', 'menus/create', { RestaurantId, title, description, image })
};

const updateMenu = async (id, RestaurantId, title, description, image, active) => {
    return await sendRequest('PUT', 'menus/update', { id, RestaurantId, title, description, image, active })
};

const deleteMenu = async (id) => {
    return await sendRequest('DELETE', 'menus/delete', { id })
}

export { getMenus, getMenuId, createMenu, updateMenu, deleteMenu }