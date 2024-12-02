import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { reviewController } from './ReviewController'
import { reviewValidation } from './ReviewValidation'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(reviewValidation.createReview),
  reviewController.createReview,
)
router.get('/', reviewController.retrieveAllReview)
router.get('/:id', reviewController.retrieveReviewById)
router.patch('/:id', reviewController.updateReviewById)
router.delete('/:id', reviewController.deleteReviewById)

export const reviewRouter = router
