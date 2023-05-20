import { axiosPrivateInstance, axiosPublicInstance } from '~/configs/axios.config';

const endpoints = {
  getListOfMedia: ({ mediaId }) => `/comments/${mediaId}`,
  getListOfUser: '/comments/',
  add: '/comments/',
  delete: ({ commentId }) => `/comments/${commentId}`,
};

const commentApi = {
  getListOfMedia: async ({ mediaId }) => {
    try {
      const response = await axiosPublicInstance.get(endpoints.getListOfMedia({ mediaId }));
      return response;
    } catch (err) {
      return { err };
    }
  },

  getListOfUser: async () => {
    try {
      const response = await axiosPrivateInstance.get(endpoints.getListOfUser);
      return response;
    } catch (err) {
      return { err };
    }
  },
  addComment: async () => {
    try {
      const response = await axiosPrivateInstance.get(endpoints.add);
      return response;
    } catch (err) {
      return { err };
    }
  },
  deleteComment: async ({ commentId }) => {
    try {
      const response = await axiosPrivateInstance.get(endpoints.delete({ commentId }));
      return response;
    } catch (err) {
      return { err };
    }
  },
};

export default commentApi;
