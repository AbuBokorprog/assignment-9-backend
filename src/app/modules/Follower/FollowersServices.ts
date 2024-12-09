import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
import { TFollower } from './FollowersInterface'

const FollowShop = async (user: any, payload: TFollower) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
      status: 'ACTIVE',
    },
  })

  await prisma.shop.findUniqueOrThrow({
    where: {
      id: payload.shopId,
    },
  })

  const isAlreadyFollow = await prisma.follower.findFirst({
    where: {
      customerId: user?.id,
      shopId: payload.shopId,
    },
  })

  if (isAlreadyFollow) {
    // If already following, unfollow
    await prisma.follower.delete({
      where: {
        id: isAlreadyFollow.id,
      },
    })
    return {
      status: 'unfollowed',
      shopId: payload.shopId,
      customerId: user?.id,
    }
  } else {
    // If not following, follow
    await prisma.follower.create({
      data: {
        customerId: user?.id,
        shopId: payload.shopId,
      },
    })
    return { status: 'followed', shopId: payload.shopId, customerId: user?.id }
  }
}

const retrieveMyFollowingShop = async (user: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  })

  const result = await prisma.follower.findMany({
    where: {
      customerId: user?.id,
    },
  })

  return result
}

export const followerServices = {
  FollowShop,
  retrieveMyFollowingShop,
}
