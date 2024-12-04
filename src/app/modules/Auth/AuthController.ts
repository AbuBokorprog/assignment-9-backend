import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { authService } from './AuthService'
import config from '../../config'

const userLogin = CatchAsync(async (req, res) => {
  const data = await authService.userLogin(req.body)
  const { refreshToken } = data

  req.cookies('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data,
  })
})

const userSignUp = CatchAsync(async (req, res) => {
  const data = await authService.userSignUp(req.body)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Signup successfully!',
    data,
  })
})

export const authController = { userLogin, userSignUp }
