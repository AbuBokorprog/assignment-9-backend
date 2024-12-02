import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TFollower } from './FollowersInterface'

const FollowShop = async (payload: TFollower) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.customerId,
      status: 'ACTIVE',
    },
  })

  const isExistShop = await prisma.shop.findUniqueOrThrow({
    where: {
      id: payload.shopId,
    },
  })

  const isAlreadyFollow = await prisma.follower.findFirst({
    where: {
      customerId: payload.customerId,
      shopId: payload.shopId,
    },
  })

  if (isAlreadyFollow) {
    throw new AppError(httpStatus.OK, 'Already following the shop!')
  }
  const follower = await prisma.follower.create({
    data: payload,
  })

  return follower
}

const unFollowShop = async (payload: TFollower) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.customerId,
      status: 'ACTIVE',
    },
  })

  const isExistShop = await prisma.shop.findUniqueOrThrow({
    where: {
      id: payload.shopId,
    },
  })

  const isAlreadyFollow = await prisma.follower.findFirst({
    where: {
      customerId: payload.customerId,
      shopId: payload.shopId,
    },
  })

  if (!isAlreadyFollow) {
    throw new AppError(httpStatus.OK, "You're not following the shop!")
  }
  const unfollow = await prisma.follower.deleteMany({
    where: {
      customerId: payload.customerId,
      shopId: payload.shopId,
    },
  })

  return unfollow
}

// const retrieveAllFollower = async () => {
//   const result = await prisma.follower.findMany({})

//   return result
// }

// const retrieveFollowerById = async (id: any) => {
//   const result = await prisma.follower.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })

//   return result
// }

// const updateFollowerById = async (id: string, payload: any) => {
//   await prisma.follower.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })

//   const result = await prisma.follower.update({
//     where: {
//       id: id,
//     },
//     data: payload,
//   })

//   return result
// }

// const deleteFollowerById = async (id: string) => {
//   await prisma.follower.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })

//   const result = await prisma.follower.delete({
//     where: {
//       id: id,
//     },
//   })

//   return result
// }

export const followerServices = {
  FollowShop,
  unFollowShop,
  // retrieveAllFollower,
  // retrieveFollowerById,
  // updateFollowerById,
  // deleteFollowerById,
}
