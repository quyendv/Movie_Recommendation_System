import Joi from 'joi';
import * as JoiRules from '../configs/joi.config.js';
import responseHandler from '../handlers/response.handler.js';
import FavoriteModel from '../models/favorite.model.js';

export const getListOfUser = async (req, res) => {
  try {
    const favoritesList = await FavoriteModel.find({ userId: req.user.id }).sort('-createdAt'); // return an array

    return responseHandler.ok(res, 'Get list favorites successfully', favoritesList);
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { error } = Joi.object({
      mediaType: JoiRules.mediaType,
      mediaId: JoiRules.mediaId,
      mediaTitle: JoiRules.mediaTitle,
      mediaPoster: JoiRules.mediaPoster,
      mediaRate: JoiRules.mediaRate,
    }).validate(req.body);
    if (error) return responseHandler.badRequest(res, error.details[0]?.message);

    /** If valid data: check if it exists before adding because it is unique to userId + mediaId  */
    const checkFavorite = await FavoriteModel.findOne({
      userId: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (checkFavorite) return responseHandler.ok(res, "Media already exists in the user's favorites", checkFavorite);

    const newFavorite = new FavoriteModel({
      ...req.body,
      userId: req.user.id,
    });
    await newFavorite.save();

    return responseHandler.created(res, 'Adding new favorite media successfully', newFavorite);
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params; // not param

    // const checkFavorite = await FavoriteModel.findOne({ userId: req.user.id, _id: favoriteId });
    // if (!checkFavorite) return responseHandler.notFound(res, 'Favorite media not found');

    // await checkFavorite.deleteOne(); // return deletedFavorite -> maybe use .remove()

    const deletedFavorite = await FavoriteModel.findOneAndDelete({ userId: req.user.id, _id: favoriteId }); // recommend use findOneAndDelete instead of findOneAndRemove
    if (!deletedFavorite) return responseHandler.notFound(res, 'Favorite media not found'); // does not exist

    return responseHandler.ok(res, 'Favorite media removed successfully');
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};
