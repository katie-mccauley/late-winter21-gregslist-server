import mongoose from 'mongoose'
const Schema = mongoose.Schema

// defines the objects for the database
export const CarSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, min: 1950 },
    price: { type: Number, required: true },
    imgUrl: { type: String, default: 'https://placehold.id/200x200' },
    color: { type: String, required: true },
    description: { type: String },
    // ObjectId is a reference to another collection
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Needed for populate
// CarSchema.virtual('creator', {
//   localField: 'creatorId',
//   foreignField: '_id',
//   justOne: true,
//   ref: 'Account'
// })
