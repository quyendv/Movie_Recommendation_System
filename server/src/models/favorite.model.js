import mongoose, { Schema } from 'mongoose';
import modelOptions from './options.js';

export default mongoose.model(
  'Favorite',
  new Schema(
    {
      // FIXME: should rename key to user
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      mediaType: {
        type: String,
        enum: ['tv', 'movie'],
        required: true,
        // default: 'movie',
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
      mediaRate: {
        type: Number,
        required: true,
      },
    },
    modelOptions,
  ),
);
