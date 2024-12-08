import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { wishlistServices } from './WishlistServices'
import { Request, Response } from 'express'

const createWishlist = CatchAsync(async (req, res) => {
  const data = await wishlistServices.createWishlist(req.user, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create wishlist successfully!',
    data,
  })
})

const retrieveAllWishlist = CatchAsync(async (req, res) => {
  const data = await wishlistServices.retrieveAllMyWishlist(req?.user)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all wishlist successfully!',
    data,
  })
})

const retrieveWishlistById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await wishlistServices.retrieveWishlistById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve wishlist by id successfully!',
    data,
  })
})

const updateWishlistById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await wishlistServices.updateWishlistById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update wishlist by id successfully!',
    data,
  })
})

const deleteWishlistById = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await wishlistServices.deleteWishlistById(req.user, req.body)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Delete wishlist by id successfully!',
      data,
    })
  },
)

export const wishlistController = {
  createWishlist,
  retrieveAllWishlist,
  retrieveWishlistById,
  updateWishlistById,
  deleteWishlistById,
}
