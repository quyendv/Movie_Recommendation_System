import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import favoriteApi from '~/apis/favorite.api';
import MediaItem from '~/components/common/MediaItem';
import SectionWrapper from '~/components/common/SectionWrapper';
import { setGlobalLoading } from '~/redux/features/globalSlice';
import { removeFavorite } from '~/redux/features/userSlice';

const FavoriteItem = ({ media, onRemove }) => {
  const [onLoading, setOnLoading] = useState(false); // on handling api
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (onLoading) return;

    setOnLoading(true);
    const { response, err } = await favoriteApi.remove({ favoriteId: media.id }); // handle api
    setOnLoading(false);

    if (response) {
      toast.success('Remove favorite successfully');
      dispatch(removeFavorite({ mediaId: media.mediaId })); // handle globalState -> redux
      onRemove(media.id); // handle localState (count, page, filteredMedias, ... etc)
    }
    if (err) toast.error(err.message);
  };

  return (
    <div className="group relative overflow-hidden">
      <MediaItem media={media} mediaType={media.mediaType} />
      <Tippy content="Remove It">
        <button
          className="absolute right-0 top-0 rounded bg-[rgba(255,0,0,0.8)] px-2.5 py-2 text-white opacity-100 transition-all duration-500 group-hover:top-0 group-hover:opacity-100 lg:-top-4 lg:opacity-0"
          onClick={handleRemove}
        >
          <BiTrash size={24} />
        </button>
      </Tippy>
    </div>
  );
};

function Favorites() {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]); // limit list by number of items in a page
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const itemsPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      console.log({ name: 'Get favorites of user', response, err });
      if (response) {
        setCount(response.data.length); // .data by server not axios
        setMedias([...response.data]); // .data by server not axios
        setFilteredMedias([...response.data].splice(0, itemsPerPage)); // .data by server not axios
      }
      if (err) toast.error(err.message);
    };
    getFavorites();
  }, []);

  const handleRemoveLocal = (id) => {
    // this fn only update localState. Update api in each FavoriteItem
    const newMedias = medias.filter((e) => e.id !== id); // can filter by id (document) or mediaId
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * itemsPerPage));
    setCount(count - 1);
  };

  const handleLoadMore = async () => {
    setPage(page + 1); // not update immediately
    setFilteredMedias([...medias].splice(0, (page + 1) * itemsPerPage)); // same as in PersonDetailGrid, NOTICE that splice modify original array (in-place)
  };

  return (
    <div className="main-content">
      <SectionWrapper title={`Your Favorites (${count})`}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredMedias?.map((media, index) => (
            <FavoriteItem key={index} media={media} onRemove={handleRemoveLocal} />
          ))}
        </div>
      </SectionWrapper>
      {filteredMedias.length < medias.length && (
        <div className="mt-8 text-center">
          <button className="load-more" onClick={handleLoadMore}>
            load more
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
