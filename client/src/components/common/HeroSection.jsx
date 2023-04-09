import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import routesConfigs from '~/configs/routes';
import CircleRate from './CircleRate';

function HeroSection() {
  return (
    // Wrapper: gradient at bottom to 30%,
    <div className="relative text-skin-contrast before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-10 before:h-[30%] before:w-full before:bg-overlayToTop">
      <Swiper
        // className="h-max w-full" // optional
        // spaceBetween={50} // optional
        modules={[Autoplay]}
        slidesPerView={1}
        grabCursor
        // autoplay={{
        //   delay: 1000,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: true,
        // }}
        speed={800}
        loop
      >
        {/* HeroItem: refactoring <SwiperSlide></SwiperSlide> to a component will be FE error -> only refactor children in SwiperSlide */}
        <SwiperSlide>
          {/* Poster: Img or backgroundImg (pt: xs: "130%",sm: "80%",md mui ~ lg tailwind: "60%",lg mui ~ xl tailwind: "45% ") -> //TODO: change poster */}
          <div className="bg-[url('/src/assets/images/hero-poster.jpg')] bg-cover bg-top bg-no-repeat pt-[130%] sm:pt-[80%] lg:pt-[60%] xl:pt-[45%]"></div>

          {/* Overlay full hero -> can change to before | after of parent | sibling*/}
          <div className="absolute inset-0 bg-overlayToRight"></div>

          {/* Content:(Desc) Wrapper > Container */}
          <div className="absolute inset-0 sm:px-[10px] md:px-20 lg:px-40">
            <div className="sm:unset flex h-full flex-col justify-center gap-8 px-8 text-skin-contrast md:w-[45%] lg:w-[50%]">
              <h3 className="typoLines text-2xl font-bold [--lines:2] [--align:left] lg:text-4xl">
                Puss in Boots: The Last Wish
              </h3>
              <div className="flex items-center gap-2">
                {/* Circle Rate: // TODO */}
                <CircleRate value={82} />
                {/* Genres */}
                <span className="rounded-full bg-skin-primary px-2 pb-1.5 pt-1 text-white">Animation</span>
                <span className="rounded-full bg-skin-primary px-2 pb-1.5 pt-1 text-white">Family</span>
              </div>
              <p className="typoLines [--lines:3]">
                Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight
                of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the
                mythical Last Wish and restore his nine lives.
              </p>
              <div>
                <Link
                  className="inline-flex items-center gap-2 rounded bg-skin-primary px-3 py-2 font-semibold text-white"
                  to={routesConfigs.mediaDetail} // TODO: re-config path by each id
                >
                  <AiFillPlayCircle size={20} />
                  <span className="uppercase">Watch now</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* Poster: Img or backgroundImg (pt: xs: "130%",sm: "80%",md mui ~ lg tailwind: "60%",lg mui ~ xl tailwind: "45% ") -> //TODO: change poster */}
          <div className="bg-[url('/src/assets/images/hero-poster.jpg')] bg-cover bg-top bg-no-repeat pt-[130%] sm:pt-[80%] lg:pt-[60%] xl:pt-[45%]"></div>

          {/* Overlay full hero -> can change to before | after of parent | sibling*/}
          <div className="absolute inset-0 bg-overlayToRight"></div>

          {/* Content:(Desc) Wrapper > Container */}
          <div className="absolute inset-0 sm:px-[10px] md:px-20 lg:px-40">
            <div className="sm:unset flex h-full flex-col justify-center gap-8 px-8 text-skin-contrast md:w-[45%] lg:w-[50%]">
              <h3 className="typoLines text-2xl font-bold [--lines:2] [--align:left] lg:text-4xl">
                Puss in Boots: The Last Wish
              </h3>
              <div className="flex items-center gap-2">
                {/* Circle Rate: // TODO */}
                <CircleRate value={82} />
                {/* Genres */}
                <span className="rounded-full bg-skin-primary px-2 pb-1.5 pt-1 text-white">Animation</span>
                <span className="rounded-full bg-skin-primary px-2 pb-1.5 pt-1 text-white">Family</span>
              </div>
              <p className="typoLines [--lines:3]">
                Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight
                of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the
                mythical Last Wish and restore his nine lives.
              </p>
              <div>
                <Link
                  className="inline-flex items-center gap-2 rounded bg-skin-primary px-3 py-2 font-semibold text-white"
                  to={routesConfigs.mediaDetail} // TODO: re-config path by each id
                >
                  <AiFillPlayCircle size={20} />
                  <span className="uppercase">Watch now</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HeroSection;
