import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { authService } from './AuthService'
import config from '../../config'
import { Request, Response } from 'express'

const userLogin = CatchAsync(async (req, res) => {
  const data = await authService.userLogin(req.body)
  const { refreshToken } = data

  res.cookie('refreshToken', refreshToken, {
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

const refreshToken = CatchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await authService.refreshToken(refreshToken)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  })
})

const changePassword = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await authService.changePassword(req?.user, req.body)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Signup successfully!',
      data,
    })
  },
)

const forgotPassword = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await authService.forgotPassword(req.body)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Please check your giving email!',
      data,
    })
  },
)

const resetPassword = CatchAsync(async (req, res) => {
  const { body } = req.body
  const token = req?.headers?.authorization
  const result = await authService.resetPassword(body, token as string)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Reset link generated successfully!',
    data: result,
  })
})

export const authController = {
  userLogin,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
}
