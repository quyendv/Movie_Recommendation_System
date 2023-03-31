import { axiosPublicInstance, axiosPrivateInstance } from '~/configs/axios';

const userEndpoint = {
  signin: 'user/signin',
  signup: 'user/signup',
  getInfo: 'user/getInfo',
  updatePassword: 'user/update-password',
};

const userApi = {
  signin: async (username, password) => {
    try {
      console.log('send request signin');
      const response = await axiosPublicInstance.post(userEndpoint.signin, { username, password });
      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  // ...
};

export default userApi;
