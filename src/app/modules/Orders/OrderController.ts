import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { ordersService } from './OrderService'
import { Request, Response } from 'express'

const createOrder = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await ordersService.createOrder(req.user, req.body)

    SuccessResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Order created successfully!',
      data,
    })
  },
)
const retrieveOrder = CatchAsync(async (req, res) => {
  const data = await ordersService.retrieveOrder()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve orders successfully!',
    data,
  })
})

const retrieveMyOrders = CatchAsync(async (req, res) => {
  const data = await ordersService.retrieveMyOrders(req?.user)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve orders successfully!',
    data,
  })
})

const retrieveOrderById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await ordersService.retrieveOrderById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve order by id successfully!',
    data,
  })
})
const updateOrder = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await ordersService.retrieveOrderById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update order by id successfully!',
    data,
  })
})
const deleteOrder = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await ordersService.retrieveOrderById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete order by id successfully!',
    data,
  })
})

const updateStatus = CatchAsync(async (req, res) => {
  const data = await ordersService.updateStatus(req.body.id, req.body.status)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update order status successfully!',
    data,
  })
})

export const ordersController = {
  createOrder,
  retrieveOrder,
  updateStatus,
  retrieveOrderById,
  retrieveMyOrders,
  updateOrder,
  deleteOrder,
}
