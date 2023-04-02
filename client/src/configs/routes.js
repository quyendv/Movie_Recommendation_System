// const routesConfigs = {
//   home: '/',
//   mediaList: (type) => `/${type}}`,
//   mediaDetail: (type, id) => `/${type}/${id}`,
//   person: (id) => `/person/${id}`,
//   favorites: '/favorites',
// };
const routesConfigs = {
  home: '/',
  movie: '/movie',
  tv: '/tv',
  mediaList: '/:mediaType',
  mediaDetail: '/:mediaType/:mediaId',
  personDetail: '/person/:personId',
  favorites: '/favorites',
  signin: '/signin',
  signup: '/signup',
  search: '/search',
};

export default routesConfigs;
