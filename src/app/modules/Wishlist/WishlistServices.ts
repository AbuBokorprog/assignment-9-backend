import prisma from '../../helpers/prisma'
import { TWishlist } from './WishlistInterface'

const createWishlist = async (user: any, payload: TWishlist) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  })

  const wishlist = await prisma.wishlist.create({
    data: {
      userId: userData.id,
      productId: payload.productId,
    },
  })

  return wishlist
}

const retrieveAllMyWishlist = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: 'ACTIVE',
    },
  })
  const result = await prisma.wishlist.findMany({
    where: {
      userId: userData.id,
    },
    include: {
      product: true,
      user: true,
    },
  })

  return result
}

const retrieveWishlistById = async (id: any) => {
  const result = await prisma.wishlist.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateWishlistById = async (id: string, payload: any) => {
  await prisma.wishlist.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.wishlist.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteWishlistById = async (id: string) => {
  await prisma.wishlist.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.wishlist.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const wishlistServices = {
  createWishlist,
  retrieveAllMyWishlist,
  retrieveWishlistById,
  updateWishlistById,
  deleteWishlistById,
}
