import MediaItem from './MediaItem';

function MediaGrid({ medias, mediaTypes }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      <MediaItem media="" mediaType="" isFavorite />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" />
      <MediaItem media="" mediaType="" isFavorite />
      <MediaItem media="" mediaType="" />
    </div>
  );
}

export default MediaGrid;
