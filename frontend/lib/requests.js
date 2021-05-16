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

export { sendRequest, getUserByToken}