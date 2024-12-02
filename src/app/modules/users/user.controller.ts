import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { userServices } from './user.service'

const createAdmin = CatchAsync(async (req, res) => {
  const data = await userServices.createAdmin(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully!',
    data,
  })
})
const createVendor = CatchAsync(async (req, res) => {
  const data = await userServices.createVendor(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Vendor created successfully!',
    data,
  })
})
const createCustomer = CatchAsync(async (req, res) => {
  const data = await userServices.createCustomer(req.body)

  SuccessResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Customer created successfully!',
    data,
  })
})

const retrieveAllUsers = CatchAsync(async (req, res) => {
  const data = await userServices.retrieveAllUsers()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve all users successfully!',
    data,
  })
})

const retrieveUserById = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await userServices.retrieveUserById(id)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Retrieve users by id successfully!',
    data,
  })
})

export const userControllers = {
  createAdmin,
  createVendor,
  createCustomer,
  retrieveAllUsers,
  retrieveUserById,
}
