import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from '../utils/Errors'
class HousesService {

  async getHouseId(id) {
    const house = await dbContext.Houses.findById(id)
    if (!house) {
      throw new BadRequest('invalid house to pick')
    }
    return house
  }


  async getHouse(query = {}) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }
  async createHouse(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }

  async removeHouse(houseId, userId) {
    const house = await this.getHouseId(houseId)
    if (house.creatorId.toString() !== userId) {
      throw new Forbidden("this isn't your house ")
    }
    await dbContext.Houses.findByIdAndDelete(houseId)
  }

  async editHouse(body) {
    const original = await this.getHouseId(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden("can't edit a photo that isnt yours")
    }



    original.year = body.year ? body.year : original.year
    original.description = body.description ? body.description : original.description
    original.color = body.color ? body.color : original.color
    original.size = body.size ? body.size : original.size

    await original.save({ runValidators: true })
    return original
  }

}

export const housesService = new HousesService()