import { axiosPublicInstance } from '~/configs/axios';
import tmdbConfigs from '~/configs/tmdb.configs';

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}&api_key=${tmdbConfigs.apiKey}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}}?api_key=${tmdbConfigs.apiKey}`,
  search: ({ mediaType, query, page }) =>
    `search/${mediaType}?query=${query}&page=${page}&api_key=${tmdbConfigs.apiKey}`,
  genre: ({ mediaType }) => `genre/${mediaType}/list?api_key=${tmdbConfigs.apiKey}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await axiosPublicInstance.get(mediaEndpoints.list({ mediaType, mediaCategory, page }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await axiosPublicInstance.get(mediaEndpoints.detail({ mediaType, mediaId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  search: async ({ mediaType, query, page }) => {
    try {
      const response = await axiosPublicInstance.get(mediaEndpoints.search({ mediaType, query, page }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getGenres: async ({ mediaType }) => {
    try {
      const response = await axiosPublicInstance.get(mediaEndpoints.genre({ mediaType }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
