import { sendRequest } from '../requests'

const getUsers = async () => {
    return await sendRequest('GET', 'users');
};

const getUserId = async (id) => {
    return await sendRequest('GET', 'users/id/' + id);
};

const getUserByToken = async (token) => {
    return await sendRequest('GET', 'users/me/', { token });
};

const createUser = async (name, surname, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('POST', 'users/create', { name, surname, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const updateUser = async (token, id, name, surname, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('PUT', 'users/update', { token, id, name, surname, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const deleteUser = async (token, id) => {
    return await sendRequest('DELETE', 'users/delete', { token, id })
}

export { getUsers, getUserId, getUserByToken, createUser, updateUser, deleteUser }