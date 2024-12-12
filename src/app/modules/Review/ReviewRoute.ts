import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { reviewController } from './ReviewController'
import { reviewValidation } from './ReviewValidation'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/',
  Auth(UserRole.CUSTOMER),
  ValidationRequest(reviewValidation.createReview),
  reviewController.createReview,
)
router.get('/', reviewController.retrieveAllReview)
router.get(
  '/users/my-review',
  Auth(UserRole.CUSTOMER),
  reviewController.retrieveAllMyReview,
)
router.get(
  '/vendor/my-review',
  Auth(UserRole.CUSTOMER),
  reviewController.retrieveAllMyReview,
)
router.get('/:id', reviewController.retrieveReviewById)
router.patch('/:id', reviewController.updateReviewById)
router.delete('/:id', reviewController.deleteReviewById)

export const reviewRouter = router
