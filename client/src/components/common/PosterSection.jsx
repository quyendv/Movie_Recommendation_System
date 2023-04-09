import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';

function PosterSection() {
  return (
    <AutoSwiper>
      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>

      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>

      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>

      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>

      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>

      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>

      {/* PosterItem Box */}
      <SwiperSlide>
        <div className='bg-[url("/src/assets/images/movie-detail-poster.jpg")] bg-cover bg-top pt-[160%]' />
      </SwiperSlide>
    </AutoSwiper>
  );
}

export default PosterSection;
