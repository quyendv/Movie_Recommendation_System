import { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import BackdropSection from '~/components/common/BackdropSection';
import CastSection from '~/components/common/CastSection';
import CircleRate from '~/components/common/CircleRate';
import ImageHeader from '~/components/common/ImageHeader';
import MediaSection from '~/components/common/MediaSection';
import PosterSection from '~/components/common/PosterSection';
import SectionWrapper from '~/components/common/SectionWrapper';
import VideoSection from '~/components/common/VideoSection';

function MediaDetail() {
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    // TODO: check media
    <>
      {/* Image Header: Sunken Image */}
      <ImageHeader imgPath="/src/assets/images/image-header.jpg" />

      {/* Wrapper (higher ImageHeader: zIndex) > Content + Videos + Backdrop + Posters + Review(cmt) + Recommendation  */}
      <div className="container relative z-10 mx-auto p-4 text-skin-contrast sm:p-8">
        {/* Content: (translateToTop above ImageHeader) > container (flexbox) > poster + infos */}
        <div className="-mt-40 lg:-mt-60 xl:-mt-80">
          {/* Container: < laptop (lg): flex-col items-center, else unset */}
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-8">
            {/* poster */}
            <div className="w-[70%] sm:w-3/5 lg:w-2/5">
              <div className="relative bg-[url('/src/assets/images/movie-poster.jpg')] bg-cover bg-center pt-[140%]" />
            </div>

            {/* infos > title  + rate&genres + desc(overview) + favorite&watchNow + cast */}
            <div className="w-[100%] lg:w-3/5">
              <div className="flex flex-col space-y-10">
                {/* title */}
                <h5 className="text-3xl font-bold xl:text-6xl">Avatar: The Way of Water 2022</h5>

                {/* rate & genres */}
                <div className="flex items-center gap-2">
                  <CircleRate value={77} />
                  <span className="full rounded-full bg-skin-primary px-2 pb-1 pt-0.5 text-white">Science Fiction</span>
                  <span className="full rounded-full bg-skin-primary px-2 pb-1 pt-0.5 text-white">Adventure</span>
                </div>

                {/* desc: (webkit-line-clamp5) */}
                <p className="typoLines [--lines:5]">
                  Set more than a decade after the events of the first film, learn the story of the Sully family (Jake,
                  Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe,
                  the battles they fight to stay alive, and the tragedies they endure.
                </p>

                {/* favorite & watch now */}
                <div className="flex items-center gap-4 text-white">
                  <div
                    className="cursor-pointer p-1 text-skin-primary [filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_30px_var(--primary))]"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    {isFavorite ? <MdFavorite size={24} /> : <MdFavoriteBorder size={24} />}
                  </div>
                  {/* //TODO onclick: ScrollIntoView Video */}
                  <button className="flex items-center gap-1 rounded bg-skin-primary px-2 py-2">
                    <AiFillPlayCircle size={24} />
                    <span className="font-bold uppercase">Watch Now</span>
                  </button>
                </div>

                {/* cast */}
                <SectionWrapper title="Cast">
                  <CastSection />
                </SectionWrapper>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}

        {/* Videos */}
        <SectionWrapper className="pt-8" title="Videos">
          <VideoSection />
        </SectionWrapper>
        {/* Videos */}

        {/* Backdrop */}
        <SectionWrapper title="Backdrops">
          <BackdropSection />
        </SectionWrapper>
        {/* Backdrop */}

        {/* Posters */}
        <SectionWrapper title={'Posters'}>
          <PosterSection />
        </SectionWrapper>
        {/* Posters */}

        {/* Review: //TODO */}
        {/* Review */}

        {/* Recommendation */}
        <SectionWrapper title="Recommendations">
          <MediaSection></MediaSection>
        </SectionWrapper>
        {/* Recommendation */}
      </div>
    </>
  );
}

export default MediaDetail;
