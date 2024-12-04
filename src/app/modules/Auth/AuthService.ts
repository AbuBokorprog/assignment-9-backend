import httpStatus from 'http-status'
import { ComparePassword } from '../../helpers/ComparePassword'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TLogin } from './AuthInterface'
import { getAccessToken } from '../../helpers/AccessToken'
import config from '../../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
const userLogin = async (payload: TLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: 'ACTIVE',
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

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.refresh_token as string,
  ) as JwtPayload

  const { email, role } = decoded

  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: 'ACTIVE',
    },
  })

  const accessTokenData = {
    email: isExistUser.email,
    role: isExistUser.role,
  }
  const accessToken = await getAccessToken(
    accessTokenData,
    config.access_token as string,
    config.access_expiresIn as string,
  )

  return {
    email: isExistUser.email,
    role: isExistUser.role,
    token: accessToken,
  }
}

const userSignUp = async (payload: any) => {}

export const authService = { userSignUp, userLogin, refreshToken }
