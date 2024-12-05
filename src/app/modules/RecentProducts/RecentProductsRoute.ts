import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { recentProductsValidation } from './RecentProducts.validation'
import { recentProductsController } from './RecentProductsController'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(recentProductsValidation.createRecentValidation),
  recentProductsController.createRecentProducts,
)
router.get('/', recentProductsController.retrieveAllRecentProducts)
router.get('/:id', recentProductsController.retrieveRecentProductsById)
router.patch('/:id', recentProductsController.updateRecentProductsById)
router.delete('/:id', recentProductsController.deleteRecentProductsById)

export const recentProductsRouter = router
