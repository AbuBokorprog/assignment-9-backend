import express from 'express'
import { paymentController } from './PaymentController'

const route = express.Router()

route.post('/success-payment', paymentController.confirmationController)
route.post('/failed-payment', paymentController.PaymentFailed)

export const paymentRoute = route
