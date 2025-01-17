import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { reviewServices } from './ReviewServices'
import { Request, Response } from 'express'

const createReview = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await reviewServices.createReview(req?.user, req.body)

    SuccessResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Create review successfully!',
      data,
    })
  },
)

const retrieveAllReview = CatchAsync(async (req, res) => {
  const data = await reviewServices.retrieveAllReview()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all reviews successfully!',
    data,
  })
})

const retrieveAllMyReview = CatchAsync(async (req, res) => {
  const data = await reviewServices.retrieveAllMyReview(req?.user)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all reviews successfully!',
    data,
  })
})

const retrieveVendorAllReview = CatchAsync(async (req, res) => {
  const data = await reviewServices.retrieveVendorAllReview(req?.user)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all reviews successfully!',
    data,
  })
})

const retrieveReviewById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await reviewServices.retrieveReviewById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve review by id successfully!',
    data,
  })
})

const updateReviewById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await reviewServices.updateReviewById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update review by id successfully!',
    data,
  })
})

const updateReviewStatus = CatchAsync(async (req, res) => {
  const data = await reviewServices.updateReviewStatus(
    req?.body?.id,
    req.body?.status,
  )

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update status successfully!',
    data,
  })
})

const deleteReviewById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await reviewServices.deleteReviewById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete review by id successfully!',
    data,
  })
})

export const reviewController = {
  createReview,
  retrieveAllReview,
  retrieveReviewById,
  updateReviewById,
  deleteReviewById,
  retrieveAllMyReview,
  updateReviewStatus,
  retrieveVendorAllReview,
}
