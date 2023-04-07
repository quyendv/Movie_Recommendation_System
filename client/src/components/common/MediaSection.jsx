import { Swiper, SwiperSlide } from 'swiper/react';
import MediaItem from './MediaItem';

function MediaSection({ mediaType = '', mediaCategory = '' }) {
  return (
    // Wrapper: "& .swiper-slide"  width: { xs: "50%", sm: "35%", md: "25%", lg: "20.5%" } ~ tailwind {default, sm, lg, xl}
    <div className="[&_.swiper-slide]:w-1/2 [&_.swiper-slide]:sm:w-[35%] [&_.swiper-slide]:lg:w-1/4 [&_.swiper-slide]:xl:w-[20.5%]">
      <Swiper
        slidesPerView="auto" // auto and set by width of swiper-slide
        grabCursor
        // className="h-max w-full" // optional
      >
        {/* MediaItemBox: keep SwiperSlide */}
        <SwiperSlide>
          <MediaItem mediaType="" media="" />
        </SwiperSlide>
        <SwiperSlide>
          <MediaItem mediaType="" media="" />
        </SwiperSlide>
        <SwiperSlide>
          <MediaItem mediaType="" media="" />
        </SwiperSlide>
        <SwiperSlide>
          <MediaItem mediaType="" media="" />
        </SwiperSlide>
        <SwiperSlide>
          <MediaItem mediaType="" media="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MediaSection;
