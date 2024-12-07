import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { ordersController } from './OrderController'
import { orderValidation } from './OrderValidation'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'
const router = express.Router()

router.post(
  '/',
  Auth(UserRole.CUSTOMER),
  ValidationRequest(orderValidation.createOrder),
  ordersController.createOrder,
)
router.get('/', ordersController.retrieveOrder)
router.get(
  '/users/my-orders',
  Auth(UserRole.CUSTOMER),
  ordersController.retrieveMyOrders,
)
router.get('/:id', ordersController.retrieveOrderById)
router.patch('/:id', ordersController.updateOrder)
router.delete('/:id', ordersController.deleteOrder)

export const orderRouter = router
