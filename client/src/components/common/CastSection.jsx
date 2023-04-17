import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { routesGeneration } from '~/configs/routes.configs';
import tmdbConfigs from '~/configs/tmdb.configs';

function CastSection({ casts }) {
  return (
    <div className="[&_.swiper-slide]:w-1/2 [&_.swiper-slide]:lg:w-1/4 [&_.swiper-slide]:xl:w-[20.5%]">
      <Swiper
        className="h-max w-full" // optional
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor
      >
        {casts?.map((cast, index) => (
          // CastItemBox
          <SwiperSlide key={index}>
            <Link to={routesGeneration.person(cast?.id)}>
              {/* Image person */}
              <div
                // @ts-ignore
                style={{ '--backdrop-poster': `url(${tmdbConfigs.posterPath(cast?.profile_path)})` }}
                className={`backdrop-poster pt-[120%]`}
              >
                {/* Desc */}
                <div className="absolute bottom-0 h-max w-full bg-black/60 p-1 text-center text-white">
                  <p className="typoLines [--lines:1] [--align:center]">{cast?.name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CastSection;
