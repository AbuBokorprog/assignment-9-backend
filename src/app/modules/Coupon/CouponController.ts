import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { couponServices } from './CouponServices'
import { Request, Response } from 'express'

const createCoupon = CatchAsync(async (req, res) => {
  const data = await couponServices.createCoupon(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create coupon successfully!',
    data,
  })
})

const applyCoupon = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await couponServices.applyCoupon(
      req?.user,
      req.body.couponCode,
      req.body.cartTotal,
    )

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Retrieve all coupons successfully!',
      data,
    })
  },
)
const retrieveAllCoupon = CatchAsync(async (req, res) => {
  const data = await couponServices.retrieveAllCoupon()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all coupons successfully!',
    data,
  })
})

const retrieveCouponById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await couponServices.retrieveCouponById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve coupon by id successfully!',
    data,
  })
})

const updateCouponById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await couponServices.updateCouponById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update coupon by id successfully!',
    data,
  })
})

const deleteCouponById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await couponServices.deleteCouponById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete coupon by id successfully!',
    data,
  })
})

export const couponController = {
  createCoupon,
  retrieveAllCoupon,
  retrieveCouponById,
  updateCouponById,
  deleteCouponById,
  applyCoupon,
}
