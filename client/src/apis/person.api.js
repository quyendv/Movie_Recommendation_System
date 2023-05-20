import { axiosTmdbInstance } from '~/configs/axios.config';
import tmdbConfigs from '~/configs/tmdb.configs';

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}?api_key=${tmdbConfigs.apiKey}`,
  medias: ({ personId }) => `person/${personId}/combined_credits?api_key=${tmdbConfigs.apiKey}`,
};

const personApi = {
  getDetail: async ({ personId }) => {
    try {
      const response = await axiosTmdbInstance.get(personEndpoints.detail({ personId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getMedias: async ({ personId }) => {
    try {
      const response = await axiosTmdbInstance.get(personEndpoints.medias({ personId }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
