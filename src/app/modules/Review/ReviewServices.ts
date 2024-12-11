import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TReview } from './ReviewInterface'

const createReview = async (user: any, payload: TReview) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  })

  const isExistProduct = await prisma.product.findUniqueOrThrow({
    where: {
      id: payload.productId,
      isActive: 'APPROVED',
    },
    include: {
      orders: {
        include: {
          order: {
            select: {
              customerId: true,
            },
          },
        },
      },
    },
  })

  payload.shopId = isExistProduct.shopId

  const isOrderedProduct = isExistProduct?.orders?.some(
    item => item.order.customerId === user?.id,
  )

  if (!isOrderedProduct) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Before giving review order this product.',
    )
  }

  const review = await prisma.review.create({
    data: {
      customerId: user?.id,
      productId: payload.productId,
      shopId: payload.shopId,
      rating: payload.rating,
      comment: payload.comment,
    },
  })

  return review
}

const retrieveAllReview = async () => {
  const result = await prisma.review.findMany({
    include: {
      product: true,
      shop: true,
      customer: true,
    },
  })

  return result
}

const retrieveAllMyReview = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: 'ACTIVE',
    },
  })
  const result = await prisma.review.findMany({
    where: {
      customerId: userData.id,
    },
    include: {
      product: true,
      shop: true,
      customer: true,
    },
  })

  return result
}

const retrieveReviewById = async (id: any) => {
  const result = await prisma.review.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      product: true,
      shop: true,
      customer: true,
    },
  })

  return result
}

const updateReviewById = async (id: string, payload: any) => {
  await prisma.review.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.review.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteReviewById = async (id: string) => {
  await prisma.review.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.review.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const reviewServices = {
  createReview,
  retrieveAllReview,
  retrieveReviewById,
  updateReviewById,
  deleteReviewById,
  retrieveAllMyReview,
}
