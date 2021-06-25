import { sendRequest } from '../requests'

const getOrganizationTypes = async () => {
    return await sendRequest('GET', 'organizationTypes');
};

const getOrganizations = async () => {
    return await sendRequest('GET', 'organizations');
};

const getOrganizationId = async (id) => {
    return await sendRequest('GET', 'organizations/id/' + id);
};

const createOrganization = async (OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber) => {
    return await sendRequest('POST', 'organizations/create', { OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber })
};

const updateOrganization = async (id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber) => {
    return await sendRequest('PUT', 'organizations/update', { id, OrganizationTypeId, UserId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber })
};

const deleteOrganization = async (id) => {
    return await sendRequest('DELETE', 'organizations/delete', { id })
}

export { getOrganizationTypes, getOrganizations, getOrganizationId, createOrganization, updateOrganization, deleteOrganization }