import { Swiper } from 'swiper/react';

function AutoSwiper({ children, className = '' }) {
  return (
    // AutoSwiper: "& .swiper-slide"  width: { xs: "50%", sm: "35%", md: "25%", lg: "20.5%" } ~ tailwind {default, sm, lg, xl}
    <div className={`auto-swiper ${className}`}>
      <Swiper
        slidesPerView="auto" // auto and set by width of swiper-slide
        grabCursor
        // className="h-max w-full" // optional
      >
        {children}
      </Swiper>
    </div>
  );
}

export default AutoSwiper;
