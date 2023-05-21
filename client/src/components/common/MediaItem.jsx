import { useState } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { routesGeneration } from '~/configs/routes.configs';
import tmdbConfigs from '~/configs/tmdb.configs';
import * as favoriteUtils from '~/utils/favorite.utils';
import CircleRate from './CircleRate';

/**
 * Use in MainSections (Home, MediaList, MediaDetail), MediaGrid (PersonDetail, Search Result - include Person)
 * @param media : movie, tv, person
 * @param mediaType : 'person' (search) | 'movie' (tmdbConfigs) | 'tv' (tmdbConfigs)
 * // TODO: add other props to recognize people | media
 */
function MediaItem({ media, mediaType }) {
  // @ts-ignore
  const { favoriteList } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false); // TODO:

  const getReleaseDate = () => {
    // movie: release_date || tv: first_air_date // format: yyyy-mm-dd => yy

    // if (mediaType === tmdbConfigs.mediaType.movie) return media?.release_date?.split('-')[0];
    // else if (mediaType === tmdbConfigs.mediaType.tv) return media?.first_air_date?.split('-')[0];
    const date = media?.release_date || media?.first_air_date;
    return date?.split('-')[0];
  };

  const getTitle = () => {
    // movie: title || tv: name
    return media.title || media.name || media.mediaTitle;
  };

  return (
    <Link
      to={
        mediaType === 'person'
          ? routesGeneration.person(media.id)
          : routesGeneration.mediaDetail(mediaType, media.mediaId || media.id)
      }
    >
      {/* MediaWrapper(div): bg-img poster pt-160%(//TODO:hover scale image), group(can move to Link): when hover toggle some child */}
      <div
        style={{
          // @ts-ignore
          '--backdrop-poster': `url(${tmdbConfigs.posterPath(
            media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path, // TODO: poster for vertical image (instead of backdrop for horizontal image)
          )})`,
        }}
        className="backdrop-poster group z-0 pt-[160%]"
      >
        {mediaType !== 'person' ? (
          // If mediaType = tv | movie
          <>
            {/* Favorite TODO: toggle favorite here */}
            {favoriteUtils.checkMediaIsFavorite({ mediaId: media.id, favoriteList }) && (
              <MdFavorite
                className="absolute right-2 top-2 text-skin-primary [filter:drop-shadow(0_0_10px_var(--primary))]"
                size={30}
              />
            )}

            {/* Media overlayToTop: > laptop show when hover, else auto show */}
            <div className="absolute inset-0 z-0 bg-overlayToTop opacity-100 transition duration-300 group-hover:opacity-100 lg:opacity-0" />

            {/* Media Play Btn */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-skin-primary px-3.5 py-1 text-white opacity-0 transition duration-300 group-hover:opacity-100">
              <BsFillPlayFill size={24} />
            </div>

            {/* Media Info */}
            <div className="absolute bottom-0 flex w-full flex-col gap-2 p-2.5 text-skin-contrast opacity-100 transition-all duration-500 group-hover:bottom-0 group-hover:opacity-100 lg:-bottom-5 lg:gap-4 lg:p-[2rem_1rem] lg:opacity-0">
              {/* Rate: almost media have vote_average, only item in Favorites have mediaRate instead  */}
              <CircleRate value={media.vote_average || media.mediaRate} />
              {/* Release Date: //TODO */}
              <p>{getReleaseDate()}</p>
              {/* Title */}
              <p className="typoLines font-bold [--align:left] [--lines:1]">{getTitle()}</p>
            </div>
          </>
        ) : (
          // If mediaType = 'person' -> show desc (as CastItem)
          <div className="absolute bottom-0 h-max w-full bg-black/60 p-2 text-center text-white">
            <p className="typoLines [--lines:1] [--align:center]">{media?.name}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default MediaItem;
