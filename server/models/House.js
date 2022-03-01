import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const HouseSchema = new Schema(
  {
    year: { type: Number, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)