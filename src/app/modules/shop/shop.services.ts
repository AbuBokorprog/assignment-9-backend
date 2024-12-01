import prisma from '../../helpers/prisma'
import { TShop } from './shop.interface'

const createShop = async (payload: TShop) => {
  await prisma.vendor.findUniqueOrThrow({
    where: {
      id: payload.vendorId,
    },
  })

  const shop = await prisma.shop.create({
    data: payload,
  })

  return shop
}

const retrieveAllShop = async () => {
  const result = await prisma.shop.findMany({})

  return result
}

const retrieveShopById = async (id: any) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateShopById = async (payload: any, id: string) => {
  await prisma.shop.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.shop.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteShopById = async (id: string) => {
  await prisma.shop.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.shop.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const shopServices = {
  createShop,
  retrieveAllShop,
  retrieveShopById,
  updateShopById,
  deleteShopById,
}
