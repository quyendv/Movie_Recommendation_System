import { SwiperSlide } from 'swiper/react';
import NavigationSwiper from './NavigationSwiper';

function BackdropSection() {
  return (
    <NavigationSwiper>
      {/* BackdropItem Box */}
      <SwiperSlide>
        <div className="bg-[url('/src/assets/images/movie-backdrop.jpg')] bg-cover bg-center pt-[60%]" />
      </SwiperSlide>

      {/* BackdropItem Box */}
      <SwiperSlide>
        <div className="bg-[url('/src/assets/images/movie-backdrop.jpg')] bg-cover bg-center pt-[60%]" />
      </SwiperSlide>

      {/* BackdropItem Box */}
      <SwiperSlide>
        <div className="bg-[url('/src/assets/images/movie-backdrop.jpg')] bg-cover bg-center pt-[60%]" />
      </SwiperSlide>

      {/* BackdropItem Box */}
      <SwiperSlide>
        <div className="bg-[url('/src/assets/images/movie-backdrop.jpg')] bg-cover bg-center pt-[60%]" />
      </SwiperSlide>

      {/* BackdropItem Box */}
      <SwiperSlide>
        <div className="bg-[url('/src/assets/images/movie-backdrop.jpg')] bg-cover bg-center pt-[60%]" />
      </SwiperSlide>
    </NavigationSwiper>
  );
}

export default BackdropSection;
