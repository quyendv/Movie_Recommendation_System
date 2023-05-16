import axios from 'axios';
import queryString from 'query-string';
import tmdbConfigs from './tmdb.configs';

// baseURL: https://api.themoviedb.org/3/
// endpoint: movie/popular
// key: ?api_key=1508e28e83ed879187a9f8258204b25f
// queryString: &page=1
// -> example: https://api.themoviedb.org/3/movie/popular?api_key=1508e28e83ed879187a9f8258204b25f&page=1 // or query api_key to end

// TODO: add baseURL
const baseURL = tmdbConfigs.baseURL;

/** Instance: Public + Private */
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

/** Interceptors */
axiosPrivateInstance.interceptors.request.use(
  (config) => ({
    ...config,
    // @ts-ignore
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': config.headers['Content-Type'] || 'application/json', // tránh overrides khi truyền Content-Type khác như multipart/form-data khi upload
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }),
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
    // return Promise.reject(error);
    throw error.response.data;
  },
);

axiosPublicInstance.interceptors.request.use(
  (config) => ({
    ...config,
    // @ts-ignore
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

export { axiosPrivateInstance, axiosPublicInstance };
