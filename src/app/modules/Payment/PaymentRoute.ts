import express from 'express'
import { paymentController } from './PaymentController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const route = express.Router()

route.post('/success-payment', paymentController.confirmationController)
route.post('/failed-payment', paymentController.PaymentFailed)
route.patch(
  '/update/payment-status',
  Auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.VENDOR),
  paymentController.updateStatus,
)

export const paymentRoute = route
