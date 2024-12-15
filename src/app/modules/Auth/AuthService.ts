import httpStatus from 'http-status'
import { ComparePassword } from '../../helpers/ComparePassword'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TLogin } from './AuthInterface'
import { getAccessToken } from '../../helpers/AccessToken'
import config from '../../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { HashPassword } from '../../helpers/HashPassword'
import { SendMail } from '../../utils/SendMail'
import { VerifyToken } from '../../helpers/VerifyToken'

const userLogin = async (payload: TLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: 'ACTIVE',
    },
    include: {
      admin: true,
      customer: true,
      vendor: true,
    },
  })

  async function getUserByRole(role: string, email: string) {
    switch (role) {
      case 'ADMIN':
      case 'SUPER_ADMIN': // Both ADMIN and SUPER_ADMIN query the `admin` table
        return await prisma.admin.findUniqueOrThrow({ where: { email } })
      case 'VENDOR':
        return await prisma.vendor.findUniqueOrThrow({ where: { email } })
      case 'CUSTOMER':
        return await prisma.customer.findUniqueOrThrow({ where: { email } })
      default:
        throw new Error('Invalid role')
    }
  }

  // const user = await getUserByRole(isExistUser.role, isExistUser.email)

  const isMatchedPassword = await ComparePassword(
    payload.password,
    isExistUser.password,
  )

  if (!isMatchedPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized!')
  }

  const accessTokenData = {
    email: isExistUser.email,
    name: isExistUser?.admin
      ? isExistUser?.admin?.name
      : isExistUser?.vendor
        ? isExistUser?.vendor?.name
        : isExistUser?.customer?.name,
    role: isExistUser.role,
    id: isExistUser.id,
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
    name: isExistUser?.admin
      ? isExistUser?.admin?.name
      : isExistUser?.vendor
        ? isExistUser?.vendor?.name
        : isExistUser?.customer?.name,
    role: isExistUser.role,
    token: accessToken,
    id: isExistUser.id,
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
    id: isExistUser.id,
  }
  const accessToken = await getAccessToken(
    accessTokenData,
    config.access_token as string,
    config.access_expiresIn as string,
  )

  return {
    email: isExistUser.email,
    role: isExistUser.role,
    id: isExistUser.id,
    token: accessToken,
  }
}

const changePassword = async (
  user: any,
  payload: { newPassword: string; oldPassword: string },
) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: { id: user?.id, status: 'ACTIVE' },
    include: {
      admin: true,
      vendor: true,
      customer: true,
    },
  })

  const isMatchedPassword = await ComparePassword(
    payload.oldPassword,
    isExistUser?.password,
  )

  if (!isMatchedPassword) {
    throw new AppError(httpStatus.NOT_FOUND, 'Old password not matched!')
  }

  const newHashedPassword = await HashPassword(payload.newPassword)
  const result = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      password: newHashedPassword,
    },
  })

  return result
}

const forgotPassword = async (payload: { email: string }) => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
      status: 'ACTIVE',
    },
    include: {
      admin: true,
      vendor: true,
      customer: true,
    },
  })

  if (!isExistUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found please register your account!',
    )
  }

  const resetTokenData = {
    email: isExistUser.email,
    name: isExistUser.admin
      ? isExistUser?.admin?.name
      : isExistUser?.vendor
        ? isExistUser?.vendor?.name
        : isExistUser?.customer?.name,
    role: isExistUser.role,
    id: isExistUser.id,
  }

  const accessToken = await getAccessToken(
    resetTokenData,
    config.access_token as string,
    '5m',
  )

  const resetLink = `https://bazaar-bridge-front.vercel.app/reset-password/email?=${isExistUser?.email}?token=${accessToken}`
  SendMail(isExistUser?.email, resetLink)
}

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  })

  const decode = VerifyToken(token, token) as JwtPayload

  if (payload.email !== decode?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User unauthorized!')
  }

  const newHashedPassword = await HashPassword(payload.newPassword)

  const result = await prisma.user.update({
    where: {
      email: payload?.email,
    },
    data: {
      password: newHashedPassword,
    },
  })

  return result
}

export const authService = {
  changePassword,
  userLogin,
  refreshToken,
  resetPassword,
  forgotPassword,
}
