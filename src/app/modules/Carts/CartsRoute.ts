import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { cartValidation } from './CartsValidation'
import { cartsController } from './CartsController'
const router = express.Router()

router.post(
  '/',
  ValidationRequest(cartValidation.createCart),
  cartsController.createCart,
)
router.get('/', cartsController.retrieveCart)
router.get('/:id', cartsController.retrieveCartById)
router.patch('/:id', cartsController.updateCart)
router.delete('/:id', cartsController.deleteCart)

export const cartRouter = router
