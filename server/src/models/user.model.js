import mongoose, { Schema } from 'mongoose';
import modelOptions from './options.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  modelOptions,
);

// TODO: create userSchema.methods.customFunction = () => ... // eg: encode password

const userModel = mongoose.model('User', userSchema);

export default userModel;
