import { sendRequest } from './requests'

const getOrganizationTypes = async () => {
    return await sendRequest('GET', 'organizationTypes');
};

const getOrganizations = async () => {
    return await sendRequest('GET', 'organizations');
};

const createOrganization = async (OrganizationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber) => {
    return await sendRequest('POST', 'organizations/create', { OrganizationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber })
};

const updateOrganization = async (id, OrganizationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber) => {
    return await sendRequest('PUT', 'organizations/update', { id, OrganizationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber })
};

export { getOrganizationTypes, getOrganizations, createOrganization, updateOrganization }