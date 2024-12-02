import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { cartsService } from './CartsServices'

const createCart = CatchAsync(async (req, res) => {
  const data = await cartsService.createCart(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Cart created successfully!',
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
  const data = await cartsService.retrieveCartById(id)

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
}
