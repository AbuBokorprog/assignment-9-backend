import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { cartValidation } from './CartsValidation'
import { cartsController } from './CartsController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'
const router = express.Router()

router.post(
  '/',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  ValidationRequest(cartValidation.createCart),
  cartsController.createCart,
)
router.post(
  '/conflict/replace-cart',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  ValidationRequest(cartValidation.createCart),
  cartsController.replaceCart,
)
router.get('/', cartsController.retrieveCart)
router.get(
  '/my/carts',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.VENDOR,
  ),
  cartsController.retrieveMyCart,
)
router.get('/:id', cartsController.retrieveCartById)
router.patch('/:id', cartsController.updateCart)
router.delete(
  '/:id',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  cartsController.deleteCart,
)

export const cartRouter = router
