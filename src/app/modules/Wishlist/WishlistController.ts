import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { wishlistServices } from './WishlistServices'

const createWishlist = CatchAsync(async (req, res) => {
  const data = await wishlistServices.createWishlist(req.user, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create wi successfully!',
    data,
  })
})

const retrieveAllWishlist = CatchAsync(async (req, res) => {
  const data = await wishlistServices.retrieveAllMyWishlist(req?.user)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all wis successfully!',
    data,
  })
})

const retrieveWishlistById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await wishlistServices.retrieveWishlistById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve wi by id successfully!',
    data,
  })
})

const updateWishlistById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await wishlistServices.updateWishlistById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update wi by id successfully!',
    data,
  })
})

const deleteWishlistById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await wishlistServices.deleteWishlistById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete wi by id successfully!',
    data,
  })
})

export const wishlistController = {
  createWishlist,
  retrieveAllWishlist,
  retrieveWishlistById,
  updateWishlistById,
  deleteWishlistById,
}
