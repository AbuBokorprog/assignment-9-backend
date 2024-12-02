import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { comparisonValidation } from './ComparisonValidation'
import { comparisonController } from './ComparisonController'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(comparisonValidation.createComparison),
  comparisonController.createComparison,
)
router.get('/', comparisonController.retrieveAllComparison)
router.get('/:id', comparisonController.retrieveComparisonById)
router.patch('/:id', comparisonController.updateComparisonById)
router.delete('/:id', comparisonController.deleteComparisonById)

export const comparisonRouter = router
