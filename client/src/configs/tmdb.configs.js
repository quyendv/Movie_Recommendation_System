const mediaType = {
  movie: 'movie',
  tv: 'tv',
};

const mediaCategory = {
  popular: 'popular',
  top_rated: 'top_rated',
};

const backdropPath = (/** @type {String} */ imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;
const posterPath = (/** @type {String} */ imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;
const youtubePath = (/** @type {Number} */ videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const apiKey = '1508e28e83ed879187a9f8258204b25f'; // TODO: Move to .env
const baseURL = 'https://api.themoviedb.org/3/';

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
  apiKey,
  baseURL,
};

export default tmdbConfigs;
