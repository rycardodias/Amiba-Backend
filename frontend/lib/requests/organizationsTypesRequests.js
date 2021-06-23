import { sendRequest } from '../requests'

const getOrganizationTypes = async () => {
    return await sendRequest('GET', 'organizationTypes');
};

const createOrganizationTypes = async (name, description) => {
    return await sendRequest('POST', 'organizationTypes/create', { name, description })
};


const updateOrganizationTypes = async (id, name, description) => {
    return await sendRequest('PUT', 'organizationTypes/update', { id, name, description })
};

const deleteOrganizationTypes = async (id) => {
    return await sendRequest('DELETE', 'organizationTypes/delete', { id })
}

export { getOrganizationTypes, createOrganizationTypes, updateOrganizationTypes, deleteOrganizationTypes }