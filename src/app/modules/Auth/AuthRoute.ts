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
route.post('/change-password', authController.changePassword)
route.post('/forgot-password', authController.forgotPassword)
route.post('/reset-password', authController.resetPassword)

export const authRouter = route
