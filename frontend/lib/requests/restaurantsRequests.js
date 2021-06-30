import { sendRequest } from '../requests'

const getRestaurants = async () => {
    return await sendRequest('GET', 'restaurants');
};

const getRestaurantId = async (id) => {
    return await sendRequest('GET', 'restaurants/id/' + id);
};

const createRestaurant = async (UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('POST', 'restaurants/create', { UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const updateRestaurant = async (id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('PUT', 'restaurants/update', { id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const deleteRestaurant = async (id) => {
    return await sendRequest('DELETE', 'restaurants/delete', { id })
}

export { getRestaurants, getRestaurantId, createRestaurant, updateRestaurant, deleteRestaurant }