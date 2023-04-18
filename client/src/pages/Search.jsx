// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ImSpinner3 } from 'react-icons/im';
import mediaApi from '~/apis/media.api';
import MediaGrid from '~/components/common/MediaGrid';
import useDebounce from '~/hooks/useDebounce';

function Search() {
  const [medias, setMedias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchTypes = ['movie', 'tv', 'person']; // TODO: useMemo or useRef
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);

  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState(''); // only for two-way binding (must useState to auto update debouncedQuery value), use debouncedQuery for search
  const debouncedQuery = useDebounce(searchValue, 500); // auto update when change input after delay (create useEffect to see console. -> Note README.FE.md)
  const [onLoading, setOnLoading] = useState(false); // true when call search request

  const search = useCallback(async () => {
    // TODO: update onSearch to loading
    setOnLoading(true);
    const { response, err } = await mediaApi.search({
      mediaType: searchTypes[currentTypeIndex],
      query: debouncedQuery, // need check query string (in useEffect or here)
      page: currentPage,
    });
    setOnLoading(false);

    console.log({ name: 'Search callMedias', response, err, currentPage, currentTypeIndex });

    // toast if err
    if (response) {
      if (currentPage === 1) setMedias([...response.results]);
      else setMedias((prev) => [...prev, ...response.results]);
    }
  }, [currentTypeIndex, debouncedQuery, currentPage]);

  // Call API: // TODO search for all types
  useEffect(() => {
    // Check value queryString: debouncedQuery.trim().length || !debouncedQuery.trim()
    if (debouncedQuery.trim().length === 0) {
      setMedias([]);
      setCurrentPage(1);
    } else {
      search();
    }
  }, [currentTypeIndex, debouncedQuery, currentPage]); // debouncedQuery not searchValue

  // Reset when change type
  useEffect(() => {
    setMedias([]);
    setCurrentPage(1);
  }, [currentTypeIndex]);

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    if (!newValue.startsWith(' ')) setSearchValue(e.target.value);
  };
  const handleClearInput = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    // MainSection ~ Wrapper > Search Group + Search Types + MediaGrid + Load more
    <div className="main-section mt-header space-y-8">
      {/* Search Group: mt to header when header transparent */}
      <div className="relative mt-10">
        {/* Input // TODO: change placeholder by searchType, rename follow by Website */}
        <input
          type="text"
          placeholder="Search in QFlix"
          ref={inputRef}
          className="w-full border border-solid border-gray-500 bg-transparent p-4 text-skin-contrast caret-skin-secondary focus:border-skin-secondary focus:placeholder:text-skin-secondary"
          value={searchValue}
          onChange={handleChangeInput}
        />
        {/* Clear | Loading  */}
        {searchValue && !onLoading && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-skin-contrast"
            onClick={handleClearInput}
          >
            <FaTimes />
          </button>
        )}
        {onLoading && (
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-skin-contrast">
            <ImSpinner3 className="animate-spin" />
          </button>
        )}
      </div>

      {/* Search Types */}
      <div className="flex justify-center gap-10">
        {searchTypes.map((type, index) => (
          <button
            key={index}
            className={`min-w-max rounded px-4 py-1 text-xl font-semibold uppercase ${
              currentTypeIndex === index ? 'bg-skin-primary text-white' : 'text-skin-contrast'
            }`}
            onClick={() => setCurrentTypeIndex(index)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* MediaGrid */}
      <MediaGrid medias={medias} mediaType={searchTypes[currentTypeIndex]} />

      {/* Load more */}
      {medias.length > 0 && (
        <div className="w-full text-center">
          <button className="load-more" onClick={() => setCurrentPage(currentPage + 1)}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
