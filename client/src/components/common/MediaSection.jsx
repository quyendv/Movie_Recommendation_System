import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

function MediaSection({ mediaType = '', mediaCategory = '' }) {
  return (
    <AutoSwiper>
      {/* MediaItemBox: keep SwiperSlide */}
      <SwiperSlide>
        <MediaItem mediaType="" media="" isFavorite />
      </SwiperSlide>

      {/* MediaItemBox: keep SwiperSlide */}
      <SwiperSlide>
        <MediaItem mediaType="" media="" isFavorite />
      </SwiperSlide>

      {/* MediaItemBox: keep SwiperSlide */}
      <SwiperSlide>
        <MediaItem mediaType="" media="" />
      </SwiperSlide>

      {/* MediaItemBox: keep SwiperSlide */}
      <SwiperSlide>
        <MediaItem mediaType="" media="" />
      </SwiperSlide>

      {/* MediaItemBox: keep SwiperSlide */}
      <SwiperSlide>
        <MediaItem mediaType="" media="" />
      </SwiperSlide>
    </AutoSwiper>
  );
}

export default MediaSection;
