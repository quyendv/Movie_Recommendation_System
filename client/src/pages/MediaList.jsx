// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import mediaApi from '~/apis/media.api';
import HeroSection from '~/components/common/HeroSection';
import MediaGrid from '~/components/common/MediaGrid';
import usePrevious from '~/hooks/usePrevious';
import { setGlobalLoading } from '~/redux/features/globalSlice';

function MediaList() {
  const { mediaType } = useParams();
  // @ts-ignore
  const prevMediaType = usePrevious(mediaType); // for change navigation (movie <-> tv)
  const dispatch = useDispatch();

  const [medias, setMedias] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => ['popular', 'top_rated'], []); // TODO: useMemo return array

  console.log({
    mediaType,
    prevMediaType,
    currentPage,
    currentCategoryIndex,
  });

  // TODO: handle scrollToTop when change mediaType
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType]);

  useEffect(() => {
    const getMedias = async () => {
      // TODO: Loading if only page = 1
      if (currentPage === 1) dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: categories[currentCategoryIndex],
        page: currentPage,
      });
      dispatch(setGlobalLoading(false));

      console.log({ name: 'MediaList getMedias', response, err });

      if (response) {
        if (currentPage === 1) setMedias([...response.results]);
        else setMedias((prev) => [...prev, ...response.results]);
      }
      // toast if err
    };

    // if change navigation: reset page, category
    if (mediaType !== prevMediaType) {
      setCurrentCategoryIndex(0);
      setCurrentPage(1);
    }

    // Call api
    getMedias();
  }, [mediaType, prevMediaType, currentCategoryIndex, currentPage, dispatch]); // TODO: update deps

  const handleChangeCategory = (index) => {
    if (index !== currentCategoryIndex) {
      setCurrentCategoryIndex(index);
      // handle LOGIC: resetPage, medias
      setCurrentPage(1);
      setMedias([]);
    }
  };

  return (
    <>
      <HeroSection mediaType={mediaType} mediaCategory={categories[currentCategoryIndex]} />

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
                {category === 'popular' ? 'popular' : 'top rated'} {/* change top_rated to top rated */}
              </button>
            ))}
          </div>
        </div>

        {/* MediaGrid */}
        <MediaGrid medias={medias} mediaType={mediaType} />

        {/* Loading More //TODO */}
        <div className="mt-8 text-center">
          <button className="load-more" onClick={() => setCurrentPage(currentPage + 1)}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
}

export default MediaList;
