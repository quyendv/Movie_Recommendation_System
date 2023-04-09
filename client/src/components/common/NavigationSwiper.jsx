import { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

function NavigationSwiper({ children }) {
  return (
    // NavigationSwiper: .swiper-slide(&.-active) <pb for pagination>, .swiper-pagination-bullet, .swiper-button-next/prev, .swiper: padding for navigationBtn,
    <div className="navigation-swiper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        grabCursor
      >
        {children}
      </Swiper>
    </div>
  );
}

export default NavigationSwiper;
