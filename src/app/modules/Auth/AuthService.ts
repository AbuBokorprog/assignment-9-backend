import httpStatus from 'http-status'
import { ComparePassword } from '../../helpers/ComparePassword'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TLogin } from './AuthInterface'
import { getAccessToken } from '../../helpers/AccessToken'
import config from '../../config'

const userLogin = async (payload: TLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  })

  const isMatchedPassword = await ComparePassword(
    payload.password,
    isExistUser.password,
  )

  if (!isMatchedPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized!')
  }

  const accessTokenData = {
    email: isExistUser.email,
    role: isExistUser.role,
  }
  const accessToken = await getAccessToken(
    accessTokenData,
    config.access_token as string,
    config.access_expiresIn as string,
  )

  const refreshToken = await getAccessToken(
    accessTokenData,
    config.refresh_token as string,
    config.refresh_expiresIn as string,
  )

  return {
    email: isExistUser.email,
    role: isExistUser.role,
    token: accessToken,
    refreshToken: refreshToken,
  }
}

const userSignUp = async (payload: any) => {}

export const authService = { userSignUp, userLogin }
