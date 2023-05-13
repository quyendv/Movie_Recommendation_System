import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import * as JoiRules from '../configs/joi.config.js';
import responseHandler from '../handlers/response.handler.js';
import UserModel from '../models/user.model.js';

const hashPassword = (password) => bcryptjs.hash(password, 8); // unnecessary async/await here -> await callFn
const comparePassword = (password, hashPassword) => bcryptjs.compare(password, hashPassword); // unnecessary async/await here -> await callFn

export const signup = async (req, res) => {
  try {
    /** Validate data request: can move to new middleware + request.handler */
    const { error } = Joi.object({
      username: JoiRules.username,
      password: JoiRules.password,
      confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
      displayName: JoiRules.displayName,
    }).validate(req.body);
    if (error) return responseHandler.badRequest(res, error.details[0]?.message);

    /** If valid data: check exist, save newModel, send token */
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
      { id: newUser.id }, // can sign only necessary data (id, role, email, ...) then in verifyToken decode id + call api get user
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );
    // TODO: Refresh token

    return responseHandler.created(res, 'The registration has been successful', {
      accessToken,
      // user: newUser._doc, // document in db {_id/id, username, password, displayName, createdAt, deletedAt, __v: ...}
      // user: newUser, // override by modelOptions.toJSON() {id, username, password, displayName}
    });
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

export const signin = async (req, res) => {
  try {
    /** Validate data */
    const { error } = Joi.object({
      username: JoiRules.username,
      password: JoiRules.password,
    }).validate(req.body);
    if (error) return responseHandler.badRequest(res, error.details[0]?.message);

    /** If valid data */
    const { username, password } = req.body;

    const checkUser = await UserModel.findOne({ username });
    if (!checkUser) return responseHandler.badRequest(res, 'User does not exist');

    const validPasswd = await comparePassword(password, checkUser.password); // must await
    if (!validPasswd) return responseHandler.badRequest(res, 'Password is wrong');

    const accessToken = jwt.sign({ id: checkUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // TODO: Refresh token

    return responseHandler.ok(res, 'The login has been successful', {
      accessToken,
      // user: checkUser,
    });
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

// TODO: refreshToken

export const getInfo = async (req, res) => {
  try {
    // const user = await UserModel.findOne({ _id: req.user.id }, '-password'); // must find by _id (not id) but result user include only id not _id (due to modelOptions), can use findById() method instead
    const user = await UserModel.findOne({ _id: req.user.id }).select('-password -createdAt -updatedAt');

    if (!user) return responseHandler.notFound(res, 'User not found');

    return responseHandler.ok(res, 'Get user successfully', user);
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};

export const updatePassword = async (req, res) => {
  try {
    /** Validate data input */
    const { error } = Joi.object({
      password: JoiRules.password,
      newPassword: JoiRules.newPassword,
      confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required(),
    }).validate(req.body);
    if (error) return responseHandler.badRequest(res, error.details[0]?.message);

    /** If valid data */
    const { password, newPassword } = req.body;
    const user = await UserModel.findOne({ _id: req.user.id });

    if (!user) return responseHandler.notFound(res, 'User not found');

    const validPasswd = await comparePassword(password, user.password);
    if (!validPasswd) return responseHandler.badRequest(res, 'Password is incorrect');
    console.log(user);

    const hashNewPasswd = await hashPassword(newPassword);
    // await UserModel.updateOne({ _id: req.user.id }, { password: hashNewPasswd });
    user.password = hashNewPasswd;
    user.save();

    return responseHandler.created(res, 'Password updated successfully');
  } catch (err) {
    return responseHandler.internalServerError(res, err);
  }
};
