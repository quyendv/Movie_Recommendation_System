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
  mediaList: '/:mediaType', // các route có params này sẽ gây lỗi conflict với page notFound (vì nó nhận route lỗi làm id)
  mediaDetail: '/:mediaType/:mediaId', // các route có params này sẽ gây lỗi conflict với page notFound (vì nó nhận route lỗi làm id)
  personDetail: '/person/:personId', // các route có params này sẽ gây lỗi conflict với page notFound (vì nó nhận route lỗi làm id)
  favorites: '/favorites',
  comments: '/comments',
  search: '/search',
  signin: '/signin',
  signup: '/signup',
  updatePassword: '/update-password',
  notfound: '*',
};

export { routesConfigs, routesGeneration };
