import axios from 'axios';
import queryString from 'query-string';

// TODO: add baseURL
const baseURL = 'http://localhost:5000/api/v1/';

// Instance: Public + Private
const axiosPrivateInstance = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

const axiosPublicInstance = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

// Interceptors
axiosPrivateInstance.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPrivateInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPublicInstance.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  },
  (error) => {
    // return Promise.reject(error);
    throw error.response.data;
  },
);

axiosPublicInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    // return Promise.reject(error);
    throw error.response.data;
  },
);

export { axiosPrivateInstance, axiosPublicInstance };
