import express, { NextFunction, Request, Response } from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { categoryController } from './CategoriesController'
import { categoryValidation } from './CategoriesValidation'
import { upload } from '../../utils/ImageUpload'

const router = express.Router()

router.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  ValidationRequest(categoryValidation.CreateCategorySchema),
  categoryController.createCategory,
)
router.get('/', categoryController.retrieveAllCategory)
router.get('/:id', categoryController.retrieveCategoryById)
router.patch('/:id', categoryController.updateCategoryById)
router.delete('/:id', categoryController.deleteCategoryById)

export const categoryRouter = router
