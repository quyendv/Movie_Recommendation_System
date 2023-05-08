import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '~/configs/tmdb.configs';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';
import MediaSection from './MediaSection';

// function Recommendation({ mediaDetail, mediaType, mediaId }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     if (mediaType === tmdbConfigs.mediaType.tv) {
//       setRecommendations(mediaDetail?.recommendations?.results);
//       setIsLoading(false);
//     } else {
//       const getRS = async () => {
//         const { response, err } = await mediaApi.getFlaskMovieRs({ data: mediaDetail });
//         if (response) {
//           setRecommendations(response);
//           setIsLoading(false);
//           console.log({ name: 'Recommendation getRS', response, err });
//         }
//         // if (err)
//       };
//       getRS();
//     }
//   }, [mediaDetail, mediaType, mediaId, recommendations, isLoading]);

//   // reset when see other mediaDetail
//   useEffect(() => {
//     setRecommendations([]);
//     setIsLoading(true);
//   }, [mediaType, mediaId]);

//   /**
//    * If loading (type movie and await flaskMovieRs) -> animate loading (pulse, ...) with temp some elements slate-400
//    * Else: if list recommendations.length > 0 then show list, else show top_rated
//    */
//   return isLoading ? (
//     <AutoSwiper className="animate-pulse">
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//       <SwiperSlide>
//         <div className="mr-1 bg-slate-400 pt-[160%]"></div>
//       </SwiperSlide>
//     </AutoSwiper>
//   ) : recommendations?.length > 0 ? (
//     <AutoSwiper>
//       {recommendations.map((media, index) => (
//         <SwiperSlide key={index}>
//           <MediaItem media={media} mediaType={mediaType} />
//         </SwiperSlide>
//       ))}
//     </AutoSwiper>
//   ) : (
//     <MediaSection mediaType={mediaType} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
//   );
// }

function Recommendation({ rsMedias, mediaType }) {
  return rsMedias?.length > 0 ? (
    <AutoSwiper>
      {rsMedias?.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  ) : (
    <MediaSection mediaType={mediaType} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
  );
}

export default Recommendation;
