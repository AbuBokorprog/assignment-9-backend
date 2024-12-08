import prisma from '../../helpers/prisma'
import { TRecentProducts } from './RecentProductsInterface'

const createRecentProducts = async (user: any, payload: TRecentProducts) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  })

  const isAlreadyExist = await prisma.recentProduct.findFirst({
    where: {
      userId: isExistUser.id,
      productId: payload.productId,
    },
  })

  if (isAlreadyExist) {
    const result = await prisma.recentProduct.update({
      where: {
        id: isAlreadyExist.id,
      },
      data: {
        productId: isAlreadyExist.productId,
      },
    })

    return result
  } else {
    const recentProduct = await prisma.recentProduct.create({
      data: {
        userId: user.id,
        productId: payload.productId,
      },
    })

    return recentProduct
  }
}

const retrieveAllRecentProducts = async () => {
  const result = await prisma.recentProduct.findMany({})

  return result
}
const retrieveMyAllRecentProducts = async (user: any) => {
  const result = await prisma.recentProduct.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  })

  return result
}

const retrieveRecentProductsById = async (id: any) => {
  const result = await prisma.recentProduct.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateRecentProductsById = async (id: string, payload: any) => {
  await prisma.recentProduct.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.recentProduct.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteRecentProductsById = async (id: string) => {
  await prisma.recentProduct.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.recentProduct.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const RecentProductsServices = {
  createRecentProducts,
  retrieveAllRecentProducts,
  retrieveRecentProductsById,
  updateRecentProductsById,
  deleteRecentProductsById,
  retrieveMyAllRecentProducts,
}
