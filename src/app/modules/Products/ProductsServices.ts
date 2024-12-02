import prisma from '../../helpers/prisma'
import { TProduct } from './ProductsInterface'

const createProduct = async (payload: TProduct) => {
  await prisma.vendor.findUniqueOrThrow({
    where: {
      id: payload.vendorId,
    },
  })

  await prisma.shop.findUniqueOrThrow({
    where: {
      id: payload.shopId,
    },
  })

  const product = await prisma.product.create({
    data: payload,
  })

  return product
}

const retrieveAllProduct = async () => {
  const result = await prisma.product.findMany({})

  return result
}

const retrieveProductById = async (id: any) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateProductById = async (id: string, payload: any) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.product.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteProductById = async (id: string) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.product.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const productServices = {
  createProduct,
  retrieveAllProduct,
  retrieveProductById,
  updateProductById,
  deleteProductById,
}
