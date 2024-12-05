import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { RecentProductsServices } from './RecentProductsService'

const createRecentProducts = CatchAsync(async (req, res) => {
  const data = await RecentProductsServices.createRecentProducts(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create recentProducts successfully!',
    data,
  })
})

const retrieveAllRecentProducts = CatchAsync(async (req, res) => {
  const data = await RecentProductsServices.retrieveAllRecentProducts()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all recent Products successfully!',
    data,
  })
})

const retrieveRecentProductsById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await RecentProductsServices.retrieveRecentProductsById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve recentProducts by id successfully!',
    data,
  })
})

const updateRecentProductsById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await RecentProductsServices.updateRecentProductsById(
    id,
    req.body,
  )

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update recentProducts by id successfully!',
    data,
  })
})

const deleteRecentProductsById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await RecentProductsServices.deleteRecentProductsById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete recentProducts by id successfully!',
    data,
  })
})

export const recentProductsController = {
  createRecentProducts,
  retrieveAllRecentProducts,
  retrieveRecentProductsById,
  updateRecentProductsById,
  deleteRecentProductsById,
}
