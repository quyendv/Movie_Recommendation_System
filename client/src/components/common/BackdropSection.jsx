import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '~/configs/tmdb.configs';
import NavigationSwiper from './NavigationSwiper';

function BackdropSection({ backdrops }) {
  return (
    <NavigationSwiper>
      {backdrops?.map((backdrop, index) => (
        // BackdropItem Box
        <SwiperSlide key={index}>
          <div
            // @ts-ignore
            style={{ '--backdrop-poster': `url(${tmdbConfigs.backdropPath(backdrop.file_path)})` }}
            className="backdrop-poster pt-[60%]"
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
}

export default BackdropSection;
