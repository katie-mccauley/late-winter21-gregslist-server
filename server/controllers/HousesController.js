import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouse)
      .get('/:id', this.getHouseId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .delete('/:id', this.removeHouse)
      .put('/:id', this.editHouse)
  }

  async getHouse(req, res, next) {
    try {
      const houses = await housesService.getHouse(req.query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseId(req, res, next) {
    try {
      const house = await housesService.getHouseId(req.params.id)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async removeHouse(req, res, next) {
    try {
      const userId = req.userInfo.id
      const houseId = req.params.id
      await housesService.removeHouse(houseId, userId)
      return res.send("this house is removed becuase your poor")
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await housesService.editHouse(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
}