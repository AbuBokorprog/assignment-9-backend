import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { userServices } from './user.service'

const createAdmin = CatchAsync(async (req, res) => {
  const data = await userServices.createAdmin(req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data,
  })
})
const createVendor = CatchAsync(async (req, res) => {})
const createCustomer = CatchAsync(async (req, res) => {})

export const userControllers = { createAdmin, createVendor, createCustomer }
