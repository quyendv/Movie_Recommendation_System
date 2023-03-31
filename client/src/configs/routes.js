// const routesConfigs = {
//   home: '/',
//   mediaList: (type) => `/${type}}`,
//   mediaDetail: (type, id) => `/${type}/${id}`,
//   person: (id) => `/person/${id}`,
//   favorites: '/favorites',
// };
const routesConfigs = {
  home: '/',
  mediaList: '/:mediaType',
  mediaDetail: '/:mediaType/:mediaId',
  personDetail: '/person/:personId',
  favorites: '/favorites',
  signin: '/signin',
  signup: '/signup',
};

export default routesConfigs;
