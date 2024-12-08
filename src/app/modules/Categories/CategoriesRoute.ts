import express, { NextFunction, Request, Response } from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { categoryController } from './CategoriesController'
import { categoryValidation } from './CategoriesValidation'
import { upload } from '../../utils/ImageUpload'
import { UserRole } from '@prisma/client'
import Auth from '../../middlewares/Auth'

const router = express.Router()

router.post(
  '/',
  Auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
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
router.patch(
  '/:id',
  Auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  categoryController.updateCategoryById,
)
router.delete(
  '/:id',
  Auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  categoryController.deleteCategoryById,
)

export const categoryRouter = router
