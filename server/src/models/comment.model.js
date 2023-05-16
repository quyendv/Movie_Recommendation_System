import mongoose from 'mongoose';
import modelOptions from './options.js';

const { Schema, model } = mongoose;

export default model(
  'Comment',
  new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      mediaType: {
        type: String,
        enum: ['tv', 'movie'],
        required: true,
        // default: 'movie'
      },
      mediaId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
    },
    modelOptions,
  ),
);
