import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { recentProductsValidation } from './RecentProducts.validation'
import { recentProductsController } from './RecentProductsController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/',
  Auth(UserRole.CUSTOMER),
  ValidationRequest(recentProductsValidation.createRecentValidation),
  recentProductsController.createRecentProducts,
)
router.get('/', recentProductsController.retrieveAllRecentProducts)
router.get(
  '/user/my-recent-products',
  Auth(UserRole.CUSTOMER),
  recentProductsController.retrieveMyAllRecentProducts,
)
router.get('/:id', recentProductsController.retrieveRecentProductsById)
router.patch('/:id', recentProductsController.updateRecentProductsById)
router.delete('/:id', recentProductsController.deleteRecentProductsById)

export const recentProductsRouter = router
