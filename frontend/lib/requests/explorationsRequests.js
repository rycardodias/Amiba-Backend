import { sendRequest } from '../requests'

const getExplorationTypes = async () => {
    return await sendRequest('GET', 'explorationTypes');
};

const getExplorations = async () => {
    return await sendRequest('GET', 'explorations');
};

const getExplorationId = async (id) => {
    return await sendRequest('GET', 'explorations/id/' + id);
};

const createExploration = async (OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization) => {
    return await sendRequest('POST', 'explorations/create', { OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization })
};

const updateExploration = async (id, OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization) => {
    return await sendRequest('PUT', 'explorations/update', { id, OrganizationId, ExplorationTypeId, name, address, locale, zipcode, telephone, mobilePhone, fiscalNumber, gpsLocalization })
};

const deleteExploration = async (id) => {
    return await sendRequest('DELETE', 'explorations/delete', { id })
}

export { getExplorationTypes, getExplorations, getExplorationId, createExploration, updateExploration, deleteExploration }