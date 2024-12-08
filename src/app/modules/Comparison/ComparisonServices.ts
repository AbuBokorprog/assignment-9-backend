import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TComparison } from './ComparisonInterface'

const createComparison = async (user: any, payload: TComparison) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  })

  const isAlreadyExist = await prisma.comparison.findFirst({
    where: {
      productId: payload.productId,
      userId: userData.id,
    },
  })

  const usersCompare = await prisma.comparison.findMany({
    where: {
      userId: userData.id,
    },
  })

  if (isAlreadyExist || usersCompare?.length > 3) {
    throw new AppError(httpStatus.ALREADY_REPORTED, 'Already exist!')
  } else {
    const comparison = await prisma.comparison.create({
      data: {
        userId: userData.id,
        productId: payload.productId,
      },
    })

    return comparison
  }
}

const retrieveAllMyComparison = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: 'ACTIVE',
    },
  })
  const result = await prisma.comparison.findMany({
    where: {
      userId: userData.id,
    },
  })

  return result
}

const retrieveComparisonById = async (id: any) => {
  const result = await prisma.comparison.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateComparisonById = async (id: string, payload: any) => {
  await prisma.comparison.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.comparison.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteComparisonById = async (id: string) => {
  await prisma.comparison.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.comparison.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const comparisonServices = {
  createComparison,
  retrieveAllMyComparison,
  retrieveComparisonById,
  updateComparisonById,
  deleteComparisonById,
}
