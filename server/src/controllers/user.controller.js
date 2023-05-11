import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import * as JoiRules from '../configs/joi.config.js';
import responseHandler from '../handlers/response.handler.js';
import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => bcryptjs.hash(password, 8); // unnecessary async/await here -> await callFn

export const signup = async (req, res) => {
  try {
    // Validate data request: can move to new middleware + request.handler
    const { error } = Joi.object({
      username: JoiRules.username,
      password: JoiRules.password,
      confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
      displayName: JoiRules.displayName,
    }).validate(req.body);
    if (error) return responseHandler.badRequest(res, error.details[0]?.message);

    // If valid data: check exist, save newModel, send token
    const { username, password, displayName } = req.body;
    const checkUser = await UserModel.findOne({ username });
    if (checkUser) return responseHandler.badRequest(res, 'Username already used');

    const newUser = new UserModel({
      username,
      password: await hashPassword(password), // await
      displayName,
    });
    await newUser.save(); // must await -> {_id/id, username, password, displayName, createdAt, deletedAt, ...}
    console.log(newUser); // include key 'id' instead of '_id' (document db - remove in toObject)

    const accessToken = jwt.sign(
      { id: newUser.id, username, password: newUser.password, displayName }, // can sign only id, then in verifyToken decode id + call api get user. Or sign necessary data (| all data)
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    return responseHandler.created(res, {
      accessToken,
      // user: newUser._doc, // document in db {_id/id, username, password, displayName, createdAt, deletedAt, __v: ...}
      user: newUser, // override by modelOptions.toJSON() {id, username, password, displayName}
    });
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};
