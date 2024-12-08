import { AppError } from './../utils/AppError'
import httpStatus from 'http-status'
import CatchAsync from '../utils/CatchAsync'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import prisma from '../helpers/prisma'
import config from '../config'
import { DecodedToken } from '../interface'

const Auth = (...userRoles: string[]) => {
  return CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're unauthorized!")
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      config.access_token as Secret,
    ) as JwtPayload

    const { email, role, exp, id } = decoded

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (exp! < currentTime) {
      throw new AppError(498, 'Access token has expired!')
    }

    // Verify user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || user.status !== 'ACTIVE') {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're unauthorized!")
    }

    // Check role
    if (userRoles.length > 0 && !userRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, "You don't have permission!")
    }

    // Attach user to request
    req.user = decoded as DecodedToken

    next()
  })
}

export default Auth
