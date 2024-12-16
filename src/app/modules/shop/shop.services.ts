import { Prisma } from '@prisma/client'
import { paginationHelpers } from '../../helpers/PaginationHelpers'
import prisma from '../../helpers/prisma'
import { ImageUpload } from '../../utils/ImageUpload'
import { TActive } from '../users/user.containts'
import { TShop } from './shop.interface'
import { searchableFields } from './ShopConstants'

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

const retrieveAllShop = async (fieldParams: any, paginationParams: any) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationParams)
  const { searchTerm, ...filterFields } = fieldParams

  const andCondition: Prisma.ShopWhereInput[] = []

  if (fieldParams?.searchTerm) {
    andCondition.push({
      OR: searchableFields?.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterFields)?.length > 0) {
    andCondition.push({
      AND: Object.keys(filterFields).map(key => ({
        [key]: {
          equals: filterFields[key],
        },
      })),
    })
  }

  const whereCondition: Prisma.ShopWhereInput = {
    AND: andCondition,
  }

  const result = await prisma.shop.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      category: true,
      followers: true,
      products: true,
      vendor: true,
      reviews: true,
    },
  })

  return result
}
const retrieveAllAvailableShop = async (
  fieldParams: any,
  paginationParams: any,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationParams)
  const { searchTerm, ...filterFields } = fieldParams

  const andCondition: Prisma.ShopWhereInput[] = []

  if (fieldParams?.searchTerm) {
    andCondition.push({
      OR: searchableFields?.map(field => ({
        [field]: {
          contains: filterFields?.searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterFields)?.length > 0) {
    andCondition.push({
      AND: Object.keys(filterFields).map(key => ({
        [key]: {
          equals: filterFields[key],
        },
      })),
    })
  }

  const whereCondition: Prisma.ShopWhereInput = {
    AND: andCondition,
    isActive: 'APPROVED',
  }

  const result = await prisma.shop.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      category: true,
      followers: true,
      products: true,
      vendor: true,
      reviews: true,
    },
  })

  const total = await prisma.shop.count({
    where: whereCondition,
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
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
      followers: {
        select: {
          customerId: true,
        },
      },
      products: true,
      reviews: {
        select: {
          rating: true,
        },
      },
      vendor: true,
    },
  })

  return result
}

const updateShopById = async (
  id: string,
  files: any,
  payload: Partial<TShop>,
) => {
  if (files.logo) {
    const logoResponse: any = await ImageUpload(
      `${payload.shopName}-logo`,
      files.logo[0].path,
    )
    const shopLogo: string = logoResponse.secure_url
    payload.shopLogo = shopLogo
  }

  if (files.cover) {
    const coverResponse: any = await ImageUpload(
      `${payload.shopName}-cover`,
      files.cover[0].path,
    )
    const shopCover: string = coverResponse.secure_url
    payload.shopCover = shopCover
  }

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
  retrieveAllAvailableShop,
  updateStatus,
}
