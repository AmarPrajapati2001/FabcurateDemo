// import {getMyToken} from '../utils/tokenManagement';
import { BASE_URL } from './url';

export const post = async (data: object) => {
  // const token: any = await getMyToken();
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
};

export const get = async (endpoint: string) => {
  const token: any = await getMyToken();

  return fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
};

export const del = async (data?: any) => {
  const token: any = await getMyToken();
  return fetch(BASE_URL, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
};

export const patch = async (data: any) => {
  const token: any = await getMyToken();

  return fetch(BASE_URL, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      return error;
    });
};

export const createFormData = (data: {
  [x: string]: any;
  hasOwnProperty: (arg0: string) => any;
}) => {
  const formData = new FormData();

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  return formData;
};
