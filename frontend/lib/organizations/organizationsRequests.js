import {sendRequest} from '../requests'

const getOrganizationTypes = async () => {
    return await sendRequest('GET', 'organizationTypes');
};

const getOrganizations = async () => {
    return await sendRequest('GET', 'organizations');
};

const createOrganization = async (type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber) => {
    return await sendRequest('POST', 'organizations/create',{type, name, adress, locale, zipcode, telephone, mobilePhone, fiscalNumber})    
};

export { getOrganizationTypes, getOrganizations, createOrganization }