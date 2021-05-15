import { sendRequest } from '../requests'

const updateAddress = async (id, token, address, locale, zipcode) => {
    const data = {
        id: id,
        token: token,
        address: (address != "" ? address : undefined),
        locale: (locale != "" ? locale : undefined),
        zipcode: (zipcode != "" ? zipcode : undefined),
    }
    return await sendRequest('PUT', 'users/update', data);
    // return response;
};

export { updateAddress }