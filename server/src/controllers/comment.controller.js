import Joi from 'joi';
import * as JoiRules from '../configs/joi.config.js';
import responseHandler from '../handlers/response.handler.js';
import CommentModel from '../models/comment.model.js';

export const addComment = async (req, res) => {
  try {
    const { error } = Joi.object({
      mediaId: JoiRules.mediaId,
      content: JoiRules.content,
      mediaType: JoiRules.mediaType,
      mediaTitle: JoiRules.mediaTitle,
      mediaPoster: JoiRules.mediaPoster,
    }).validate(req.body);
    if (error) return responseHandler.badRequest(res, error.details[0]?.message);

    const newComment = new CommentModel({
      ...req.body,
      userId: req.user.id,
    });
    await newComment.save();

    return responseHandler.created(res, 'Create comment successfully', newComment);
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const checkComment = await CommentModel.findOne({ _id: commentId });
    if (!checkComment) return responseHandler.notFound(res, 'Comment not found');

    await checkComment.deleteOne(); // or .remove();

    return responseHandler.ok(res, 'Comment deleted successfully');
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

/** Get all comments of each user (about all media) -> public api, verifyToken is unnecessary */
export const getCommentsOfUser = async (req, res) => {
  try {
    // TODO: limit comment in BE | FE -> nên xử lý ở BE (db) nếu quá nhiều comments, còn không thì xử lý ở FE sẽ chỉ gọi api 1 lần
    const comments = await CommentModel.find({ userId: req.user.id }).sort('-createdAt');

    return responseHandler.ok(res, 'Get comments of user successfully', comments);
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

/** Get all comments about a media (of all user) */
export const getCommentsOfMedia = async (req, res) => {
  try {
    // TODO: limit comment in BE | FE -> nên xử lý ở BE (db) nếu quá nhiều comments, còn không thì xử lý ở FE sẽ chỉ gọi api 1 lần
    const comments = await CommentModel.find({ mediaId: req.params.mediaId }).sort('-createdAt');

    return responseHandler.ok(res, 'Get comments of media successfully', comments);
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};
