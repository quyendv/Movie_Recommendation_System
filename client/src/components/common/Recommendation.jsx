import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '~/configs/tmdb.configs';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';
import MediaSection from './MediaSection';

function Recommendation({ recommendations, mediaType }) {
  console.log({ name: 'Recommendation', medias: recommendations });

  return recommendations?.length > 0 ? (
    <AutoSwiper>
      {recommendations.map((media, index) => (
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
