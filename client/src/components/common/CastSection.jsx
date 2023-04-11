import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

function CastSection() {
  return (
    <div className="[&_.swiper-slide]:w-1/2 [&_.swiper-slide]:lg:w-1/4 [&_.swiper-slide]:xl:w-[20.5%]">
      <Swiper
        className="h-max w-full" // optional
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor
      >
        {/* CastItemBox */}
        <SwiperSlide>
          {/* //TODO: config path */}
          <Link to="/person/123456">
            {/* Image person */}
            <div className='relative bg-[url("/src/assets/images/cast-person.jpg")] bg-cover bg-center pt-[120%]'>
              {/* Desc */}
              <div className="absolute bottom-0 h-max w-full bg-black/60 p-1 text-center text-white">
                <p className="typoLines [--lines:1]">Sam Worthington</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>

        {/* CastItemBox */}
        <SwiperSlide>
          {/* //TODO: config path */}
          <Link to="/person/123456">
            {/* Image person */}
            <div className='relative bg-[url("/src/assets/images/cast-person.jpg")] bg-cover bg-center pt-[120%]'>
              {/* Desc */}
              <div className="absolute bottom-0 h-max w-full bg-black/60 p-1 text-center text-white">
                <p className="typoLines [--lines:1]">Sam Worthington</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>

        {/* CastItemBox */}
        <SwiperSlide>
          {/* //TODO: config path */}
          <Link to="/person/123456">
            {/* Image person */}
            <div className='relative bg-[url("/src/assets/images/cast-person.jpg")] bg-cover bg-center pt-[120%]'>
              {/* Desc */}
              <div className="absolute bottom-0 h-max w-full bg-black/60 p-1 text-center text-white">
                <p className="typoLines [--lines:1]">Sam Worthington</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>

        {/* CastItemBox */}
        <SwiperSlide>
          {/* //TODO: config path */}
          <Link to="/person/123456">
            {/* Image person */}
            <div className='relative bg-[url("/src/assets/images/cast-person.jpg")] bg-cover bg-center pt-[120%]'>
              {/* Desc */}
              <div className="absolute bottom-0 h-max w-full bg-black/60 p-1 text-center text-white">
                <p className="typoLines [--lines:1]">Sam Worthington</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>

        {/* CastItemBox */}
        <SwiperSlide>
          {/* //TODO: config path */}
          <Link to="/person/123456">
            {/* Image person */}
            <div className='relative bg-[url("/src/assets/images/cast-person.jpg")] bg-cover bg-center pt-[120%]'>
              {/* Desc */}
              <div className="absolute bottom-0 h-max w-full bg-black/60 p-1 text-center text-white">
                <p className="typoLines [--lines:1]">Sam Worthington</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CastSection;
