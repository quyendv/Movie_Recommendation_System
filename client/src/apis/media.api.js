// @ts-nocheck
import { axiosTmdbInstance } from '~/configs/axios.config';
import tmdbConfigs from '~/configs/tmdb.configs';
import commentApi from './comment.api';
import favoriteApi from './favorite.api';

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}&api_key=${tmdbConfigs.apiKey}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}}?api_key=${tmdbConfigs.apiKey}`,
  // Subset for detail: credits, videos, recommend, reviews + isFavorite (custom BE)
  credits: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/credits?api_key=${tmdbConfigs.apiKey}`,
  videos: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/videos?api_key=${tmdbConfigs.apiKey}`,
  images: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/images?api_key=${tmdbConfigs.apiKey}`,
  recommendations: ({ mediaType, mediaId }) => `${mediaType}/${mediaId}/recommendations?api_key=${tmdbConfigs.apiKey}`,

  search: ({ mediaType, query, page }) =>
    `search/${mediaType}?query=${query}&page=${page}&api_key=${tmdbConfigs.apiKey}`,
  genre: ({ mediaType }) => `genre/${mediaType}/list?api_key=${tmdbConfigs.apiKey}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await axiosTmdbInstance.get(mediaEndpoints.list({ mediaType, mediaCategory, page }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await axiosTmdbInstance.get(mediaEndpoints.detail({ mediaType, mediaId }));

      // *** SubsetData: custom response by BE for favorite, credits, videos, recommend, images, reviews, etc... -> convert to custom here

      // Failed: Các api riêng rẽ (không đợi kết quả hàm này để gọi hàm kia) thì không cần await lần lượt mà xử lý Promise.all chung
      // const credits = await axiosTmdbInstance.get(mediaEndpoints.credits({ mediaType, mediaId }));
      // const videos = await axiosTmdbInstance.get(mediaEndpoints.videos({ mediaType, mediaId }));
      // const images = await axiosTmdbInstance.get(mediaEndpoints.images({ mediaType, mediaId }));
      // const recommendations = await axiosTmdbInstance.get(mediaEndpoints.recommendations({ mediaType, mediaId }));
      // const { response: commentResponse, err: commentErr } = await commentApi.getListOfMedia({ mediaId });
      // const { response: favoriteResponse, err: favoriteErr } = await favoriteApi.isFavoriteOfUser({ mediaId });
      // console.log({ name: 'Get comment api', commentResponse, commentErr, mediaId });
      // console.log({ name: 'Get favorite api', favoriteResponse, favoriteErr, mediaId });

      // Optimize call many independent api
      const [
        credits,
        videos,
        images,
        recommendations,
        { response: commentResponse, err: commentErr },
        { response: favoriteResponse, err: favoriteErr },
      ] = await Promise.all([
        axiosTmdbInstance.get(mediaEndpoints.credits({ mediaType, mediaId })),
        axiosTmdbInstance.get(mediaEndpoints.videos({ mediaType, mediaId })),
        axiosTmdbInstance.get(mediaEndpoints.images({ mediaType, mediaId })),
        axiosTmdbInstance.get(mediaEndpoints.recommendations({ mediaType, mediaId })),
        commentApi.getListOfMedia({ mediaId }),
        favoriteApi.isFavoriteOfUser({ mediaId }),
      ]);

      if (response) {
        response.credits = credits;
        response.videos = videos;
        response.images = images;
        response.recommendations = recommendations;
        response.comments = commentResponse?.data;
        response.isFavorite = favoriteResponse?.data?.isFavorite;
      }

      return { response };
    } catch (err) {
      return { err };
    }
  },

  // // TODO: Temporary RS api for only movie
  // getFlaskMovieRs: async ({ mediaType = 'movie', data }) => {
  //   try {
  //     // Get Indexes of list flaskMovieRs (Only Movie)
  //     const { data: rsIndexes } = await axios.post('http://localhost:5000/api/media/rs-movie', data); // TODO: not axios instance -> response is object include .data -> destructuring with rename
  //     console.log('rsIndexes :>> ', rsIndexes);

  //     // Get data of all movies with each index
  //     /**
  //      * !IMPORTANT: using for instead of using forEach, map, reduce, ...
  //      * - Khi sử dụng forEach để lặp qua các phần tử trong một mảng, mỗi lần lặp sẽ tạo ra một hàm callback bất đồng bộ.
  //      *  + Trong trường hợp này, forEach sẽ gọi hàm callback bất đồng bộ đó cho mỗi phần tử trong mảng rsIndexes. Khi đó, vòng lặp sẽ không đợi cho tất cả các hàm callback bất đồng bộ hoàn thành trước khi tiếp tục đến các phần tử tiếp theo trong mảng.
  //      *  + Do đó, việc thêm phần tử vào mảng response bên trong hàm callback bất đồng bộ không đảm bảo rằng tất cả các phần tử sẽ được thêm vào trước khi mảng response được truyền đi. Khi kết quả được in ra, mảng response có thể không chứa tất cả các phần tử mà bạn mong đợi, và độ dài của nó sẽ là 0.
  //      * - Trong khi đó, nếu bạn sử dụng vòng lặp for, việc xử lý các phần tử trong mảng rsIndexes sẽ được thực hiện đồng bộ, mỗi phần tử sẽ được xử lý theo thứ tự.
  //      *  + Việc sử dụng await cùng với for sẽ đảm bảo rằng các phần tử được xử lý bất đồng bộ, nhưng vẫn theo đúng thứ tự.
  //      *  + Ngoài cách khắc phục dùng for, ta có thể dùng thêm Promise.all
  //      *      const response = await Promise.all(rsIndexes.map(async (rsIndex) => {
  //      *        const detailItem = await axiosTmdbInstance.get(mediaEndpoints.detail({ mediaType, mediaId: rsIndex }));
  //      *        return detailItem;
  //      *      }));
  //      *    hoặc
  //      *      const promises = rsIndexes.map(rsIndex => axiosTmdbInstance.get(mediaEndpoints.detail({ mediaType, mediaId: rsIndex })));
  //      *      const response = await Promise.all(promises);
  //      *    Trong đó: 'Promise.all' để đợi tất cả các hàm callback bất đồng bộ trong map hoàn thành.
  //      */
  //     const response = [];
  //     for (const rsIndex of rsIndexes) {
  //       const detailItem = await axiosTmdbInstance.get(mediaEndpoints.detail({ mediaType, mediaId: rsIndex }));
  //       if (detailItem) response.push(detailItem);
  //     }

  //     return { response };
  //   } catch (err) {
  //     return { err };
  //   }
  // },

  search: async ({ mediaType, query, page }) => {
    try {
      const response = await axiosTmdbInstance.get(mediaEndpoints.search({ mediaType, query, page }));
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getGenres: async ({ mediaType }) => {
    try {
      const response = await axiosTmdbInstance.get(mediaEndpoints.genre({ mediaType }));
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
