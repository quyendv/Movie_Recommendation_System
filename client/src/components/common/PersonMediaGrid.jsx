import MediaItem from './MediaItem';

function PersonMediaGrid({ personId }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {/* PersonMediaItem ~ MediaItem */}
      <MediaItem media={''} mediaType={''} isFavorite/>
      <MediaItem media={''} mediaType={''} isFavorite/>
      <MediaItem media={''} mediaType={''} isFavorite/>
      <MediaItem media={''} mediaType={''} isFavorite/>
      <MediaItem media={''} mediaType={''} isFavorite/>
      <MediaItem media={''} mediaType={''} isFavorite/>
    </div>
  );
}

export default PersonMediaGrid;
