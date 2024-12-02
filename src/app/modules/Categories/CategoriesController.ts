import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { categoryServices } from './CategoriesServices'

const createCategory = CatchAsync(async (req, res) => {
  const data = await categoryServices.createCategory(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create category successfully!',
    data,
  })
})

const retrieveAllCategory = CatchAsync(async (req, res) => {
  const data = await categoryServices.retrieveAllCategory()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all categories successfully!',
    data,
  })
})

const retrieveCategoryById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await categoryServices.retrieveCategoryById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve category by id successfully!',
    data,
  })
})

const updateCategoryById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await categoryServices.updateCategoryById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update category by id successfully!',
    data,
  })
})

const deleteCategoryById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await categoryServices.deleteCategoryById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete category by id successfully!',
    data,
  })
})

export const categoryController = {
  createCategory,
  retrieveAllCategory,
  retrieveCategoryById,
  updateCategoryById,
  deleteCategoryById,
}
