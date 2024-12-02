import express from 'express'
import { authController } from './AuthController'
const route = express.Router()

route.post('/login', authController.userLogin)
route.post('/sign-up', authController.userSignUp)

export const authRouter = route
