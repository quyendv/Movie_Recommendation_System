// @ts-nocheck
import axios from 'axios';
import { axiosPublicInstance } from '~/configs/axios';
import tmdbConfigs from '~/configs/tmdb.configs';

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}&api_key=${tmdbConfigs.apiKey}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}}?api_key=${tmdbConfigs.apiKey}`,
  // Subset for detail: credits, videos, recommend, reviews + isFavorite (custom BE)
  credits: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/credits?api_key=${tmdbConfigs.apiKey}`,
  videos: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/videos?api_key=${tmdbConfigs.apiKey}`,
  images: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/images?api_key=${tmdbConfigs.apiKey}`,
  recommendations: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/recommendations?api_key=${tmdbConfigs.apiKey}`,

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

      // SubsetData: custom response by BE for favorite, credits, videos, recommend, images, reviews, etc... -> convert to custom here
      const credits = await axiosPublicInstance.get(mediaEndpoints.credits({ mediaType, mediaId }));
      const videos = await axiosPublicInstance.get(mediaEndpoints.videos({ mediaType, mediaId }));
      const images = await axiosPublicInstance.get(mediaEndpoints.images({ mediaType, mediaId }));
      const recommendations = await axiosPublicInstance.get(mediaEndpoints.recommendations({ mediaType, mediaId }));

      if (response) {
        response.credits = credits;
        response.videos = videos;
        response.images = images;
        response.recommendations = recommendations;
      }

      return { response };
    } catch (err) {
      return { err };
    }
  },

  // TODO: Temporary RS api for only movie
  getFlaskMovieRs: async ({ mediaType = 'movie', data }) => {
    try {
      // Get Indexes of list flaskMovieRs (Only Movie)
      const { data: rsIndexes } = await axios.post('http://localhost:5000/api/media/rs-movie', data); // TODO: not axios instance -> response is object include .data -> destructuring with rename
      console.log('rsIndexes :>> ', rsIndexes);

      // Get data of all movies with each index
      const response = [];
      for (const rsIndex of rsIndexes) {
        const detailItem = await axiosPublicInstance.get(mediaEndpoints.detail({ mediaType, mediaId: rsIndex }));
        if (detailItem) response.push(detailItem);
      }

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
