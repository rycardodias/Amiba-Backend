import { sendRequest } from './requests'
import Cookies from 'js-cookie';

const login = async (email, password) => {
    const response = await sendRequest('POST', 'users/login', { email, password });
    if (response.data.data) {
        Cookies.set('token', response.data.data, {
            Path: '',
            expires: 1000 * 24 * 365 * 60 * 60, // 1 year cookie
        });
    }
    return response;
};

const logout = () => {
    Cookies.remove('token')
};

const updateAddress = async (id, token, address, locale, zipcode) => {
    return await sendRequest('PUT', 'users/update', { id, token, address, locale, zipcode });
};

const updatePassword = async (id, token, password) => {
    return await sendRequest('PUT', 'users/update', { id, token, password });
};

export { login, logout, updateAddress, updatePassword }