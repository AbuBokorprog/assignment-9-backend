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

export const userRouter = router
