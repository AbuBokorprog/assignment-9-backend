import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { productServices } from './ProductsServices'

const createProduct = CatchAsync(async (req, res) => {
  const data = await productServices.createProduct(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create product successfully!',
    data,
  })
})

const retrieveAllProduct = CatchAsync(async (req, res) => {
  const data = await productServices.retrieveAllProduct()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all products successfully!',
    data,
  })
})

const retrieveProductById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await productServices.retrieveProductById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve product by id successfully!',
    data,
  })
})

const updateProductById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await productServices.updateProductById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update product by id successfully!',
    data,
  })
})

const deleteProductById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await productServices.deleteProductById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete product by id successfully!',
    data,
  })
})

export const productController = {
  createProduct,
  retrieveAllProduct,
  retrieveProductById,
  updateProductById,
  deleteProductById,
}
