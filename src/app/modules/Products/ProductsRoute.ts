import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { productController } from './ProductsController'
import { productValidation } from './ProductValidation'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(productValidation.CreateProductSchema),
  productController.createProduct,
)
router.get('/', productController.retrieveAllProduct)
router.get('/:id', productController.retrieveProductById)
router.patch('/:id', productController.updateProductById)
router.delete('/:id', productController.deleteProductById)

export const productRouter = router
