import { axiosPrivateInstance, axiosPublicInstance } from '~/configs/axios.config';

const userEndpoint = {
  signin: 'user/signin',
  signup: 'user/signup',
  getInfo: 'user/info',
  updatePassword: 'user/update-password',
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await axiosPublicInstance.post(userEndpoint.signin, { username, password });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  signup: async ({ username, displayName, password, confirmPassword }) => {
    try {
      const response = await axiosPublicInstance.post(userEndpoint.signup, {
        username,
        displayName,
        password,
        confirmPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getInfo: async () => {
    try {
      const response = await axiosPrivateInstance.get(userEndpoint.getInfo);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  updatePassword: async ({ password, newPassword, confirmPassword }) => {
    try {
      const response = await axiosPrivateInstance.put(userEndpoint.updatePassword, {
        password,
        newPassword,
        confirmPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
