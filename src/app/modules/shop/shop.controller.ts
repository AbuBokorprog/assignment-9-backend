import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { shopServices } from './shop.services'
import { Request, Response } from 'express'

const createShop = CatchAsync(async (req, res) => {
  const data = await shopServices.createShop(req.files, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create shop successfully!',
    data,
  })
})

const retrieveAllShop = CatchAsync(async (req, res) => {
  const data = await shopServices.retrieveAllShop()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all shops successfully!',
    data,
  })
})

const retrieveAllShopByVendor = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user

    const data = await shopServices.retrieveAllShopByVendor(user)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Retrieve all shops successfully!',
      data,
    })
  },
)

const retrieveShopById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await shopServices.retrieveShopById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve shop by id successfully!',
    data,
  })
})

const updateShopById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await shopServices.updateShopById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update shop by id successfully!',
    data,
  })
})

const deleteShopById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await shopServices.deleteShopById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete shop by id successfully!',
    data,
  })
})

export const shopController = {
  createShop,
  retrieveAllShop,
  retrieveShopById,
  updateShopById,
  deleteShopById,
  retrieveAllShopByVendor,
}
