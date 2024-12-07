import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { comparisonValidation } from './ComparisonValidation'
import { comparisonController } from './ComparisonController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(comparisonValidation.createComparison),
  comparisonController.createComparison,
)
router.get(
  '/user/my-comparison',
  Auth(UserRole.CUSTOMER),
  comparisonController.retrieveAllComparison,
)
router.get('/:id', comparisonController.retrieveComparisonById)
router.patch('/:id', comparisonController.updateComparisonById)
router.delete('/:id', comparisonController.deleteComparisonById)

export const comparisonRouter = router
