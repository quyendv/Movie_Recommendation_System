export const checkMediaIsFavorite = ({ mediaId, favoriteList }) => {
  return favoriteList && favoriteList.find((e) => e.mediaId.toString() === mediaId.toString());
};
