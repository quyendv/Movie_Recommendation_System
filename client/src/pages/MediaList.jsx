import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mediaApi from '~/apis/media.api';
import HeroSection from '~/components/common/HeroSection';
import MediaGrid from '~/components/common/MediaGrid';

function MediaList() {
  const { mediaType } = useParams();
  const [medias, setMedias] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['popular', 'top_rated'];

  useEffect(() => {
    const getMedias = async () => {
      // TODO: load more + loading...
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: categories[currentCategoryIndex],
        page: currentPage,
      });
      console.log({ name: 'MediaList getMedias', response, err });

      if (response) {
        // @ts-ignore
        if (currentPage === 1) setMedias([...response.results]);
        // @ts-ignore
        else setMedias((prev) => [...prev, ...response.results]);
      }
      // toast if err
    };

    getMedias();
  }, [mediaType, currentCategoryIndex, currentPage]); // TODO: update deps

  const handleChangeCategory = (index) => {
    if (index !== currentCategoryIndex) setCurrentCategoryIndex(index);
    // TODO: handle LOGIC
  };

  return (
    <>
      <HeroSection />

      <div className="main-section">
        {/* Title & Categories */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 lg:flex-row">
          <h5 className="text-2xl font-bold text-skin-contrast">{mediaType === 'movies' ? 'Movies' : 'TV Series'}</h5>
          <div className="flex gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`rounded px-5 py-2 font-medium uppercase ${
                  currentCategoryIndex === index ? 'bg-skin-primary text-white' : 'text-skin-contrast'
                }`}
                onClick={() => handleChangeCategory(index)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* MediaGrid */}
        <MediaGrid medias={medias} mediaType={mediaType} />

        {/* Loading More //TODO */}
        <button
          className="w-full py-2 font-bold uppercase text-skin-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Load more
        </button>
      </div>
    </>
  );
}

export default MediaList;
