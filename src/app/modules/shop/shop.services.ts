import prisma from '../../helpers/prisma'
import { ImageUpload } from '../../utils/ImageUpload'
import { TActive } from '../users/user.containts'
import { TShop } from './shop.interface'

const createShop = async (files: any, payload: TShop) => {
  const logoResponse: any = await ImageUpload(
    `${payload.shopName}-logo`,
    files.logo[0].path,
  )
  const shopLogo: string = logoResponse.secure_url
  const coverResponse: any = await ImageUpload(
    `${payload.shopName}-cover`,
    files.cover[0].path,
  )
  const shopCover: string = coverResponse.secure_url
  const shopData = {
    shopName: payload.shopName,
    shopLogo: shopLogo,
    shopCover: shopCover,
    description: payload.description,
    vendorId: payload.vendorId,
    address: payload.address,
    registrationNumber: payload.registrationNumber,
    categoryId: payload.categoryId,
  }
  await prisma.vendor.findUniqueOrThrow({
    where: {
      id: payload.vendorId,
    },
  })

  const shop = await prisma.shop.create({
    data: shopData,
  })

  return shop
}

const retrieveAllShop = async () => {
  const result = await prisma.shop.findMany({
    include: {
      category: true,
      followers: true,
      orders: true,
      products: true,
      vendor: true,
    },
  })

  return result
}

const retrieveAllShopByVendor = async (vendor: {
  email: string
  role: string
}) => {
  const isExistVendor = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: vendor.email,
      isDeleted: false,
    },
  })
  const result = await prisma.shop.findMany({
    where: {
      vendorId: isExistVendor.id,
    },
    include: {
      category: true,
      followers: true,
      orders: true,
      products: {
        include: {
          reviews: true,
          wishlist: true,
        },
      },
      reviews: true,
      vendor: true,
    },
  })

  return result
}

const retrieveShopById = async (id: any) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      category: true,
      followers: true,
      orders: true,
      products: true,
      reviews: true,
      vendor: true,
    },
  })

  return result
}

const updateShopById = async (id: string, payload: any) => {
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

const updateStatus = async (id: string, status: TActive) => {
  await prisma.shop.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.shop.update({
    where: {
      id: id,
    },
    data: {
      isActive: status,
    },
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
  retrieveAllShopByVendor,
  deleteShopById,
  updateStatus,
}
