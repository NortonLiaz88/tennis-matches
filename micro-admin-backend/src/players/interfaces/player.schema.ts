import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String },
    ranking: { type: String },
    rankingLevel: { type: Number },
    pictureUrl: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
