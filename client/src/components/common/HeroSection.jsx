// @ts-nocheck
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import mediaApi from '~/apis/media.api';
import { routesGeneration } from '~/configs/routes.configs';
import tmdbConfigs from '~/configs/tmdb.configs';
import { setGlobalLoading } from '~/redux/features/globalSlice';
import CircleRate from './CircleRate';

const HeroItem = ({ media, mediaType, genres }) => {
  const bgPath = tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path);

  return (
    <>
      {/* Poster: Img or backgroundImg (pt: xs: "130%",sm: "80%",md mui ~ lg tailwind: "60%",lg mui ~ xl tailwind: "45% ") -> //TODO: change poster */}
      <div
        className={`backdrop-poster pt-[130%] sm:pt-[80%] lg:pt-[60%] xl:pt-[45%]`}
        style={{
          '--backdrop-poster': `url(${bgPath})`, // or add '' like `url('${bgPath}')`
        }}
      ></div>

      {/* Overlay full hero -> can change to before | after of parent | sibling*/}
      <div className="absolute inset-0 bg-overlayToRight"></div>

      {/* Content:(Desc) Wrapper > Container */}
      <div className="absolute inset-0 sm:px-[10px] md:px-20 lg:px-40">
        <div className="sm:unset flex h-full flex-col justify-center gap-8 px-8 text-skin-contrast md:w-[45%] lg:w-[50%]">
          <h3 className="typoLines text-3xl font-bold [--align:left] [--lines:2] xl:text-6xl">
            {media.title || media.name}
          </h3>
          <div className="flex items-center gap-2">
            {/* Circle Rate: // TODO */}
            <CircleRate value={media.vote_average} />
            {/* Genres: get only 2 genre -> slice | splice */}
            {media.genre_ids.slice(0, 2).map((genreIdMedia, index) => (
              <span key={index} className="min-w-max rounded-full bg-skin-primary px-4 pb-1.5 pt-1 text-white">
                {genres?.find((genreItem) => genreItem.id === genreIdMedia)?.name}
              </span>
            ))}
          </div>
          <p className="typoLines [--lines:3]">{media.overview}</p>
          <div>
            <Link
              className="inline-flex items-center gap-2 rounded bg-skin-primary px-3 py-2 font-semibold text-white"
              to={routesGeneration.mediaDetail(mediaType, media.id)}
            >
              <AiFillPlayCircle size={20} />
              <span className="uppercase">Watch now</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

function HeroSection({ mediaType, mediaCategory }) {
  const [medias, setMedias] = useState([]);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) setMedias(response.results);
      // TODO: toast if err, globalLoading
      console.log({ name: 'HeroSection getMedias', response, err });
    };

    const getGenres = async () => {
      // TODO: update position of calling globalLoading so that it doesn't obscure toastify
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getGenres({ mediaType });
      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      // TODO: if err
      dispatch(setGlobalLoading(false));
      console.log({ name: 'HeroSection getGenres', response, err });
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]); // TODO: dispatch

  return (
    // Wrapper: gradient at bottom to 30%,
    <div className="relative text-skin-contrast before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:z-10 before:h-[30%] before:w-full before:bg-overlayToTop">
      <Swiper
        // className="h-max w-full" // optional
        modules={[Autoplay]}
        slidesPerView={1}
        grabCursor
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop
      >
        {medias.map((media, index) => (
          // HeroItemBox: refactoring <SwiperSlide></SwiperSlide> to a component will be FE error -> only refactor children in SwiperSlide
          <SwiperSlide key={index}>
            <HeroItem media={media} mediaType={mediaType} genres={genres} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSection;
