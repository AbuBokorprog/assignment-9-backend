import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { categoryController } from './CategoriesController'
import { categoryValidation } from './CategoriesValidation'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(categoryValidation.CreateCategorySchema),
  categoryController.createCategory,
)
router.get('/', categoryController.retrieveAllCategory)
router.get('/:id', categoryController.retrieveCategoryById)
router.patch('/:id', categoryController.updateCategoryById)
router.delete('/:id', categoryController.deleteCategoryById)

export const categoryRouter = router
