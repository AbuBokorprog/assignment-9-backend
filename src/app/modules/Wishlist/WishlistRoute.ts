import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'
import { wishlistValidation } from './WishlistValidation'
import { wishlistController } from './WishlistController'

const router = express.Router()

router.post(
  '/',
  Auth(UserRole.CUSTOMER),
  ValidationRequest(wishlistValidation.createWishlist),
  wishlistController.createWishlist,
)
router.get(
  '/user/my-wishlist',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  wishlistController.retrieveAllWishlist,
)
router.get('/:id', wishlistController.retrieveWishlistById)
router.patch('/:id', wishlistController.updateWishlistById)
router.delete(
  '/user/wishlist-delete',
  Auth(
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.SUPER_ADMIN,
    UserRole.VENDOR,
  ),
  wishlistController.deleteWishlistById,
)

export const wishlistRouter = router
