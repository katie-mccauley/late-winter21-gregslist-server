import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { HouseSchema } from "../models/House";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  // adds to the db
  Cars = mongoose.model('Car', CarSchema)
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Houses = mongoose.model("Houses", HouseSchema)
}

export const dbContext = new DbContext()
