import { useEffect, useState } from 'react';
import personApi from '~/apis/person.api';
import MediaItem from './MediaItem';

function PersonMediaGrid({ personId }) {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]); // limit list by totalInPage
  const [currentPage, setCurrentPage] = useState(1);
  const totalInPage = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await personApi.getMedias({ personId });
      console.log({ name: 'PersonMediaGrid getMedias', response, err });

      // toast if err
      if (response) {
        const mediasSorted = response.cast.sort((a, b) => getReleaseDate(b) - getReleaseDate(a)); // newest list
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].slice(0, totalInPage));
      }
    };

    getMedias();
  }, [personId]);

  const handleLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...medias.slice(currentPage * totalInPage, currentPage * totalInPage + totalInPage),
    ]); // or ...[...medias].splice(currentPage * totalInPage, totalInPage) or set filteredMedias([...medias].splice(0, (currentPage + 1) * totalInPage, currentPage + totalInPage)) or toSplice()
    setCurrentPage(currentPage + 1);
  };

  const getReleaseDate = (media) => {
    // movie: release_date || tv: first_air_date
    const date = new Date(media.release_date || media.first_air_date);
    return date.getTime();
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {filteredMedias.map((media, index) => (
          // PersonMediaItem ~ MediaItem
          <MediaItem key={index} media={media} mediaType={media?.media_type} />
        ))}
      </div>

      {/* Load more */}
      {filteredMedias.length < medias.length && (
        <div className="mt-8 w-full text-center">
          <button className="load-more" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}

export default PersonMediaGrid;
