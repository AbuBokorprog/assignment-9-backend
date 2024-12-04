import express from 'express'
import { authController } from './AuthController'
import ValidationRequest from '../../utils/ValidationRequest'
import { authValidation } from './AuthValidation'
const route = express.Router()

route.post('/login', authController.userLogin)
route.post(
  '/refresh-token',
  ValidationRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
)
route.post('/sign-up', authController.userSignUp)

export const authRouter = route
