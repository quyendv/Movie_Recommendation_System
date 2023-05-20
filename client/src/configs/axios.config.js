// @ts-nocheck
import axios from 'axios';
import queryString from 'query-string';
import tmdbConfigs from './tmdb.configs';

// baseURL: https://api.themoviedb.org/3/
// endpoint: movie/popular
// key: ?api_key=1508e28e83ed879187a9f8258204b25f
// queryString: &page=1
// -> example: https://api.themoviedb.org/3/movie/popular?api_key=1508e28e83ed879187a9f8258204b25f&page=1 // or query api_key to end

const baseURL =
  // config .env to .../api/v1/ not root
  process.env.NODE_ENV === 'development' ? import.meta.env.VITE_SERVER_LOCAL : import.meta.env.VITE_SERVER_PRODUCT; // check 'development' | 'production'

// https://qflix-server.onrender.com
// https://qflix-server.vercel.app

/** Instance: Public (To NodeJS no required token) + Private (NodeJS verifyToken) + TMDB (TMDB data) */
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

const axiosTmdbInstance = axios.create({
  baseURL: tmdbConfigs.baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

/** Interceptors */
axiosPrivateInstance.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': config.headers['Content-Type'] || 'application/json', // tránh overrides khi truyền Content-Type khác như multipart/form-data khi upload
      Authorization: `Bearer ${localStorage.getItem('acc_token')}`,
    },
  }),
  (error) => {
    // return Promise.reject(error);
    throw error.response.data;
  },
);

axiosPrivateInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    // return Promise.reject(error);
    throw error.response.data;
  },
);

axiosPublicInstance.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': config.headers['Content-Type'] || 'application/json', // tránh overrides khi truyền Content-Type khác như multipart/form-data khi upload
    },
  }),
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

axiosTmdbInstance.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': config.headers['Content-Type'] || 'application/json', // tránh overrides khi truyền Content-Type khác như multipart/form-data khi upload
    },
  }),
  (error) => {
    // return Promise.reject(error);
    throw error.response.data;
  },
);

axiosTmdbInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    // return Promise.reject(error);
    throw error.response.data;
  },
);

export { axiosPrivateInstance, axiosPublicInstance, axiosTmdbInstance };
