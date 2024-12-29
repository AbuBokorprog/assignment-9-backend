import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { Newsletter } from '@prisma/client'

const subscribeNewsletter = async (payload: Newsletter) => {
  const isValidEmail = await prisma.user.findFirst({
    where: {
      email: payload?.email,
    },
  })

  if (!isValidEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'This is not a valid user!')
  }

  const result = await prisma.newsletter.create({
    data: payload,
  })

  return result
}

const retrieveAllSubscriber = async () => {
  const result = await prisma.newsletter.findMany({})

  return result
}

export const newsletterServices = { subscribeNewsletter, retrieveAllSubscriber }
