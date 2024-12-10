import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TComparison } from './ComparisonInterface'

const createComparison = async (user: any, payload: TComparison) => {
  // Ensure the user exists
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  })

  // Ensure the product exists
  const productData = await prisma.product.findUniqueOrThrow({
    where: { id: payload.productId },
  })

  // Check if the product is already in the comparison list
  const isAlreadyExist = await prisma.comparison.findFirst({
    where: {
      productId: payload.productId,
      userId: userData.id,
    },
  })

  if (isAlreadyExist) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'Product is already in the comparison list.',
    )
  }

  // Get all products in the user's comparison list
  const userComparisonProducts = await prisma.comparison.findMany({
    where: {
      userId: userData.id,
    },
    include: {
      product: {
        select: {
          categoryId: true,
        },
      },
    },
  })

  // Check if the user has already added 3 products
  if (userComparisonProducts.length >= 3) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can only compare up to 3 products.',
    )
  }

  // Ensure all products belong to the same category
  const hasDifferentCategory = userComparisonProducts.some(
    comparison => comparison.product.categoryId !== productData.categoryId,
  )

  if (hasDifferentCategory) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'All products in the comparison list must belong to the same category.',
    )
  }

  // Add the product to the comparison list
  const comparison = await prisma.comparison.create({
    data: {
      userId: userData.id,
      productId: payload.productId,
    },
  })

  return comparison
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
