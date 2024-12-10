import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { couponValidation } from './CouponValidation'
import { couponController } from './CouponController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(couponValidation.createCoupon),
  couponController.createCoupon,
)
router.post(
  '/apply-coupon',
  Auth(UserRole.CUSTOMER),
  couponController.applyCoupon,
)
router.get('/', couponController.retrieveAllCoupon)
router.get('/:id', couponController.retrieveCouponById)
router.patch('/:id', couponController.updateCouponById)
router.delete('/:id', couponController.deleteCouponById)

export const couponRouter = router
