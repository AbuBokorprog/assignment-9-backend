import prisma from '../../helpers/prisma'
import { TReview } from './ReviewInterface'

const createReview = async (payload: TReview) => {
  const review = await prisma.review.create({
    data: payload,
  })

  return review
}

const retrieveAllReview = async () => {
  const result = await prisma.review.findMany({})

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
  })

  return result
}

const retrieveReviewById = async (id: any) => {
  const result = await prisma.review.findUniqueOrThrow({
    where: {
      id: id,
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
