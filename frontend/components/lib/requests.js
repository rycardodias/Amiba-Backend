import Cookies from 'js-cookie';

const SERVER_URL = 'http://127.0.0.1:5000/'

const sendRequest = async (metodh, url, params) => {
  const requestMetadata = {
    method: metodh,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
  const response = await fetch((SERVER_URL + url), requestMetadata)
    .then((res) => res.json())
    .then(
      (data) => ({
        data,
      }),
      (error) => ({ error }),
    );
  return response;
};

const login = async (email, password) => {
  const response = await sendRequest('POST', 'users/login', { email, password });
  if (response.data.data) {
    Cookies.set('token', response.data.data, {
      path: '',
      expires: 1000 * 24 * 365 * 60 * 60, // 1 year cookie
    });
  }
  //
  return response;
};

const logout = () => {
  Cookies.set('token', '');
};

const getUserByToken = async () => {
  const token = Cookies.get('token');
  const id = { token };

  const data = await sendRequest('POST', ('users/me'), id)
  if (data.error) {
    return {
      isLoaded: true,
      items: data,
    };
  }
  const res = {
    isLoaded: true,
    items: data.data,
  };

  return res;
};

export { sendRequest, login, logout, getUserByToken }