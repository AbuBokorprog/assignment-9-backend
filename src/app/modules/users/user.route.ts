import express from 'express'
import { userControllers } from './user.controller'
import ValidationRequest from '../../utils/ValidationRequest'
import { userValidation } from './user.validation'
const router = express.Router()

router.post(
  '/create-admin',
  ValidationRequest(userValidation.createAdmin),
  userControllers.createAdmin,
)

router.post(
  '/create-vendor',
  ValidationRequest(userValidation.createVendor),
  userControllers.createVendor,
)
router.post(
  '/create-customer',
  ValidationRequest(userValidation.createAdmin),
  userControllers.createCustomer,
)

router.get('/', userControllers.retrieveAllUsers)

router.get('/:id', userControllers.retrieveUserById)

export const userRouter = router
