import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CarsService {
  async getAll(query = {}) {
    const cars = await dbContext.Cars.find(query)
    return cars
  }

  async getById(id) {
    const car = await dbContext.Cars.findById(id)
    if (!car) {
      throw new BadRequest('invalid car id')
    }
    return car
  }

  async create(body) {
    const car = await dbContext.Cars.create(body)
    return car
  }

  async edit(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('You do not own this car... yet')
    }
    // we use a turnary to validate if data was passed, otherwise keep as is
    original.make = update.make ? update.make : original.make
    original.model = update.model ? update.model : original.model
    original.year = update.year ? update.year : original.year
    original.price = update.price ? update.price : original.price
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl

    await original.save({ runValidators: true })
    return original
  }

  async remove(carId, userId) {
    // SAFETY FIRST
    // does that car exist
    const car = await this.getById(carId)
    // only the creator can delete the objects they created
    // NOTE creatorId is an object YOU MUST CONVERT IT TO A STRING
    if (car.creatorId.toString() !== userId) {
      throw new Forbidden('That aint your car bro')
    }
    await dbContext.Cars.findByIdAndDelete(carId)
  }
}

export const carsService = new CarsService()
