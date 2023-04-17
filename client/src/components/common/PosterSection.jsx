import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '~/configs/tmdb.configs';
import AutoSwiper from './AutoSwiper';

function PosterSection({ posters }) {
  return (
    <AutoSwiper>
      {posters?.map((poster, index) => (
        // PosterItem Box
        <SwiperSlide key={index}>
          <div
            // @ts-ignore
            style={{ '--backdrop-poster': `url(${tmdbConfigs.posterPath(poster.file_path)})` }}
            className="backdrop-poster bg-cover bg-top pt-[160%]"
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
}

export default PosterSection;
