import { axiosPrivateInstance } from '~/configs/axios.config';

const endpoints = {
  list: 'user/favorites',
  add: 'user/favorites',
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
  isFavorite: ({ mediaId }) => `media/favorite/${mediaId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await axiosPrivateInstance.get(endpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await axiosPrivateInstance.post(endpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  remove: async ({ favoriteId }) => {
    try {
      const response = await axiosPrivateInstance.delete(endpoints.remove({ favoriteId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  isFavoriteOfUser: async ({ mediaId }) => {
    try {
      const response = await axiosPrivateInstance.get(endpoints.isFavorite({ mediaId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
