import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { productServices } from './ProductsServices'
import { Request, Response } from 'express'
import pick from '../../helpers/Pick'
import { adminFilterableFields } from './ProductsContaints'

const createProduct = CatchAsync(async (req, res) => {
  const data = await productServices.createProduct(req.files, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create product successfully!',
    data,
  })
})

const retrieveAllProduct = CatchAsync(async (req, res) => {
  // pick
  const filterFields = pick(req.query, adminFilterableFields)
  // pagination pick
  const paginationOption = pick(req.query, [
    'limit',
    'page',
    'sortBy',
    'sortOrder',
  ])
  const data = await productServices.retrieveAllProduct(
    filterFields,
    paginationOption,
  )

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all products successfully!',
    data,
  })
})

const allAvailableProducts = CatchAsync(async (req, res) => {
  const data = await productServices.allAvailableProducts()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all available products successfully!',
    data,
  })
})

const allFlashSaleProducts = CatchAsync(async (req, res) => {
  const data = await productServices.allFlashSaleProducts()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all flash sale products successfully!',
    data,
  })
})

const retrieveAllProductByVendor = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await productServices.retrieveAllProductByVendor(req?.user)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Retrieve all products successfully!',
      data,
    })
  },
)

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

const updateProductStatusId = CatchAsync(async (req, res) => {
  const data = await productServices.updateProductStatusId(
    req.body.id,
    req.body.status,
  )

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update product status by id successfully!',
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
  allAvailableProducts,
  allFlashSaleProducts,
  retrieveProductById,
  updateProductById,
  deleteProductById,
  retrieveAllProductByVendor,
  updateProductStatusId,
}
