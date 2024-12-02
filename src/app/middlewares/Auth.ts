import { AppError } from './../utils/AppError'
import httpStatus from 'http-status'
import CatchAsync from '../utils/CatchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from '../helpers/prisma'
const Auth = (...userRole: any) => {
  return CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(',')[1]

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're unauthorized!")
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, 'secret') as JwtPayload

    const { email, role } = decoded

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
        status: 'ACTIVE',
      },
    })

    if (userRole && !userRole.include(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're unAuthorized!")
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default Auth
