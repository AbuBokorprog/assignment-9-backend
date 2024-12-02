import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { ordersController } from './OrderController'
import { orderValidation } from './OrderValidation'
const router = express.Router()

router.post(
  '/',
  ValidationRequest(orderValidation.createOrder),
  ordersController.createOrder,
)
router.get('/', ordersController.retrieveOrder)
router.get('/:id', ordersController.retrieveOrderById)
// router.patch('/:id', ordersController.updateOrder)
router.delete('/:id', ordersController.deleteOrder)

export const orderRouter = router
