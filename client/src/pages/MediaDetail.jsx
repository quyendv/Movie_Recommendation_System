// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import mediaApi from '~/apis/media.api';
import BackdropSection from '~/components/common/BackdropSection';
import CastSection from '~/components/common/CastSection';
import CircleRate from '~/components/common/CircleRate';
import ImageHeader from '~/components/common/ImageHeader';
import PosterSection from '~/components/common/PosterSection';
import Recommendation from '~/components/common/Recommendation';
import SectionWrapper from '~/components/common/SectionWrapper';
import VideoSection from '~/components/common/VideoSection';
import tmdbConfigs from '~/configs/tmdb.configs';
import { setGlobalLoading } from '~/redux/features/globalSlice';

function MediaDetail() {
  const { mediaType, mediaId } = useParams();
  const [media, setMedia] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to top-left screen when reload
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      console.log({ name: 'MediaDetail getMedia', response, err });
      if (response) {
        // Custom response by BE for detail, favorite, credits, videos, recommend, images, reviews, etc... -> convert custom mediaApi in ~/apis/media.api.js
        setMedia(response);
      }
      // TODO: if err -> toast
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]); // TODO: dispatch

  return (
    media && (
      <>
        {/* Image Header: Sunken Image */}
        <ImageHeader imgPath={tmdbConfigs.backdropPath(media?.backdrop_path || media?.poster_path)} />

        {/* Wrapper (higher ImageHeader: zIndex) > Content + Videos + Backdrop + Posters + Review(cmt) + Recommendation  */}
        <div className="container relative z-10 mx-auto p-4 text-skin-contrast sm:p-8">
          {/* Content: (translateToTop above ImageHeader) > container (flexbox) > poster + infos */}
          <div className="-mt-40 lg:-mt-60 xl:-mt-80">
            {/* Container: < laptop (lg): flex-col items-center, else unset */}
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-8">
              {/* poster */}
              <div className="w-[70%] sm:w-3/5 lg:w-2/5">
                <div
                  style={{
                    '--backdrop-poster': `url(${tmdbConfigs.backdropPath(media.poster_path || media.backdrop_path)})`,
                  }}
                  className="backdrop-poster pt-[140%]"
                />
              </div>

              {/* infos > title  + rate&genres + desc(overview) + favorite&watchNow + cast */}
              <div className="w-[100%] lg:w-3/5">
                <div className="flex flex-col space-y-10">
                  {/* title */}
                  <h5 className="text-3xl font-bold xl:text-6xl">{media.title}</h5>

                  {/* rate & genres */}
                  <div className="flex items-center gap-2">
                    <CircleRate value={media?.vote_average} />
                    {media?.genres?.slice(0, 2).map((genre, index) => (
                      <span
                        key={index}
                        className="full min-w-max rounded-full bg-skin-primary px-4 pb-1.5 pt-1 text-white"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* desc: (webkit-line-clamp5) */}
                  <p className="typoLines [--lines:5]">{media.overview}</p>

                  {/* favorite & watch now */}
                  <div className="flex items-center gap-4 text-white">
                    <div
                      className="cursor-pointer p-1 text-skin-primary [filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_30px_var(--primary))]"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      {isFavorite ? <MdFavorite size={24} /> : <MdFavoriteBorder size={24} />}
                    </div>
                    {/* //TODO onclick: ScrollIntoView Video */}
                    <button
                      className="flex items-center gap-1 rounded bg-skin-primary px-2 py-2"
                      onClick={() => videoRef.current.scrollIntoView()}
                    >
                      <AiFillPlayCircle size={24} />
                      <span className="font-bold uppercase">Watch Now</span>
                    </button>
                  </div>

                  {/* cast */}
                  <SectionWrapper title="Cast">
                    <CastSection casts={media?.credits?.cast} />
                  </SectionWrapper>
                </div>
              </div>
            </div>
          </div>
          {/* Content */}

          {/* Videos: //TODO ref to scrollIntoView */}
          <div ref={videoRef}>
            <SectionWrapper className="pt-8" title="Videos">
              {/* only max 5 videos */}
              <VideoSection videos={media?.videos?.results?.slice(0, 5)} />
            </SectionWrapper>
          </div>
          {/* Videos */}

          {/* Backdrop: // TODO: combine BackdropSection vs PosterSection */}
          <SectionWrapper title="Backdrops">
            {/* max 10 images */}
            <BackdropSection backdrops={media?.images?.backdrops?.slice(0, 10)} />
          </SectionWrapper>
          {/* Backdrop */}

          {/* Posters */}
          <SectionWrapper title={'Posters'}>
            {/* max 10 images */}
            <PosterSection posters={media?.images?.posters?.slice(0, 10)} />
          </SectionWrapper>
          {/* Posters */}

          {/* Review: //TODO */}
          {/* Review */}

          {/* Recommendation: */}
          <SectionWrapper title="Recommendations">
            {/* <Recommendation mediaDetail={media} mediaType={mediaType} mediaId={mediaId} /> */}
            <Recommendation rsMedias={media?.recommendations?.results} mediaType={mediaType} />
          </SectionWrapper>
          {/* Recommendation */}
        </div>
      </>
    )
  );
}

export default MediaDetail;
