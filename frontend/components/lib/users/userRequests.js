import { sendRequest } from '../requests'

const updateAddress = async (id, token, address, locale, zipcode) => {
    return await sendRequest('PUT', 'users/update', { id, token, address, locale, zipcode });
    // return response;
};

export {updateAddress}