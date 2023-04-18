import MediaItem from './MediaItem';

function MediaGrid({ medias, mediaType, className = '' }) {
  return (
    <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {medias?.map((media, index) => (
        <MediaItem key={index} media={media} mediaType={mediaType} />
      ))}
    </div>
  );
}

export default MediaGrid;
