import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { cartsService } from './CartsServices'
import { Request, Response } from 'express'

const createCart = CatchAsync(async (req, res) => {
  const data = await cartsService.createCart(req.user, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully!',
    data,
  })
})
const replaceCart = CatchAsync(async (req, res) => {
  const data = await cartsService.replaceCart(req.user, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Cart replace successfully!',
    data,
  })
})
const retrieveCart = CatchAsync(async (req, res) => {
  const data = await cartsService.retrieveCart()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve carts successfully!',
    data,
  })
})
const retrieveMyCart = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await cartsService.retrieveMyCart(req?.user)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Retrieve carts successfully!',
      data,
    })
  },
)
const retrieveCartById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await cartsService.retrieveCartById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve cart by id successfully!',
    data,
  })
})
const updateCart = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await cartsService.retrieveCartById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update cart by id successfully!',
    data,
  })
})
const deleteCart = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await cartsService.deleteCart(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete cart by id successfully!',
    data,
  })
})

export const cartsController = {
  createCart,
  retrieveCart,
  retrieveCartById,
  updateCart,
  deleteCart,
  retrieveMyCart,
  replaceCart,
}
