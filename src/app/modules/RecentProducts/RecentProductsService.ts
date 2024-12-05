import prisma from '../../helpers/prisma'
import { TRecentProducts } from './RecentProductsInterface'

const createRecentProducts = async (payload: TRecentProducts) => {
  const recentProduct = await prisma.recentProduct.create({
    data: payload,
  })

  return recentProduct
}

const retrieveAllRecentProducts = async () => {
  const result = await prisma.recentProduct.findMany({})

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
}
