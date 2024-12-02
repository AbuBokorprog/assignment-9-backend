import prisma from '../../helpers/prisma'
import { TFollower } from './FollowersInterface'

const createFollower = async (payload: TFollower) => {
  const follower = await prisma.follower.create({
    data: payload,
  })

  return follower
}

const retrieveAllFollower = async () => {
  const result = await prisma.follower.findMany({})

  return result
}

const retrieveFollowerById = async (id: any) => {
  const result = await prisma.follower.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateFollowerById = async (id: string, payload: any) => {
  await prisma.follower.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.follower.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteFollowerById = async (id: string) => {
  await prisma.follower.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.follower.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const followerServices = {
  createFollower,
  retrieveAllFollower,
  retrieveFollowerById,
  updateFollowerById,
  deleteFollowerById,
}
