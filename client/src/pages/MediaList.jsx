import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HeroSection from '~/components/common/HeroSection';
import MediaGrid from '~/components/common/MediaGrid';

function MediaList() {
  const { mediaType } = useParams();
  const [currentCategory, setCurrentCategory] = useState(0);

  const categories = ['popular', 'top rated'];

  const handleChangeCategory = (index) => {
    if (index !== currentCategory) setCurrentCategory(index);
    // handle LOGIC
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
                  currentCategory === index ? 'bg-skin-primary text-white' : 'text-skin-contrast'
                }`}
                onClick={() => handleChangeCategory(index)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* MediaGrid */}
        <MediaGrid medias={''} mediaTypes={''} />

        {/* Loading More //TODO */}
      </div>
    </>
  );
}

export default MediaList;
