import responseHandler from '../handlers/response.handler.js';
import favoriteModel from '../models/favorite.model.js';

export const isFavoriteOfUser = async (req, res) => {
  try {
    const checkFavorite = await favoriteModel.findOne({ userId: req.user.id, mediaId: req.params.mediaId });
    return responseHandler.ok(res, 'Check favorite of user successfully', { isFavorite: !!checkFavorite }); // need true | false, not document
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
