const routesGeneration = {
  // home: '/',
  // favorites: '/favorites',
  mediaList: (type) => `/${type}}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  person: (id) => `/person/${id}`,
};

const routesConfigs = {
  home: '/',
  movie: '/movie', // exact movie (tv) or movies (tvs) to useParam() in page
  tv: '/tv',
  mediaList: '/:mediaType',
  mediaDetail: '/:mediaType/:mediaId',
  personDetail: '/person/:personId',
  favorites: '/favorites',
  signin: '/signin',
  signup: '/signup',
  search: '/search',
};

export { routesConfigs, routesGeneration };
