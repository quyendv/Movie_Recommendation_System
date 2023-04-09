import { BsFillPlayFill } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CircleRate from './CircleRate';

function MediaItem({ media, mediaType, isFavorite = false }) {
  return (
    // TODO: config path
    <Link to={'/movies/123456'}>
      {/* Link > MediaWrapper(div): bg-img poster pt-160%(//TODO:hover scale image), group(can move to Link): when hover toggle some child */}
      <div className='group relative bg-gray-700 bg-[url("/src/assets/images/movie-poster.jpg")] bg-cover bg-center pt-[160%]'>
        {/* Check tv series | movie | people */}

        {/* If mediaType = tv | movie -> */}
        <>
          {/* Favorite if have */}
          {isFavorite && (
            <MdFavorite
              className="absolute right-2 top-2 text-skin-primary [filter:drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_10px_var(--primary))_drop-shadow(0_0_30px_var(--primary))]"
              size={24}
            />
          )}

          {/* Media Backdrop: > laptop show when hover, else auto show */}
          <div className="absolute inset-0 bg-overlayToTop opacity-100 transition duration-300 group-hover:opacity-100 lg:opacity-0" />

          {/* Media Play Btn */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-skin-primary px-3.5 py-1 text-white opacity-0 transition duration-300 group-hover:opacity-100">
            <BsFillPlayFill size={24} />
          </div>

          {/* Media Info */}
          <div className="absolute bottom-0 flex w-full flex-col gap-2 p-2.5 text-skin-contrast opacity-100 transition duration-300 group-hover:opacity-100 lg:-bottom-5 lg:gap-4 lg:p-[2rem_1rem] lg:opacity-0">
            {/* Rate  */}
            <CircleRate value={75} />
            {/* Release Date: //TODO */}
            <p>2022</p>
            {/* Title */}
            <p className="typoLines font-bold [--lines:1]">Avatar: The Way of Water</p>
          </div>
        </>

        {/* If mediaType = people */}
      </div>
    </Link>
  );
}

export default MediaItem;
