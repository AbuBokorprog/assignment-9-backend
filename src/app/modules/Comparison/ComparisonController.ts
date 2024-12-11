import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { comparisonServices } from './ComparisonServices'

const createComparison = CatchAsync(async (req, res) => {
  const data = await comparisonServices.createComparison(req.user, req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Create comparison successfully!',
    data,
  })
})

const retrieveAllComparison = CatchAsync(async (req, res) => {
  const data = await comparisonServices.retrieveAllMyComparison(req?.user)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve my comparisons successfully!',
    data,
  })
})

const retrieveComparisonById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await comparisonServices.retrieveComparisonById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve comparison by id successfully!',
    data,
  })
})

const updateComparisonById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await comparisonServices.updateComparisonById(id, req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update comparison by id successfully!',
    data,
  })
})

const deleteComparisonById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await comparisonServices.deleteComparisonById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Delete comparison successfully!',
    data,
  })
})

export const comparisonController = {
  createComparison,
  retrieveAllComparison,
  retrieveComparisonById,
  updateComparisonById,
  deleteComparisonById,
}
