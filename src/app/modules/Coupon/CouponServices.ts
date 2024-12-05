import prisma from '../../helpers/prisma'
import { TCoupon } from './CouponInterface'

const createCoupon = async (payload: TCoupon) => {
  const data = {
    name: payload.name,
    code: payload.code,
    discount: Number(payload.discount),
    expiryDate: new Date(payload.expiryDate),
  }
  const coupon = await prisma.coupon.create({
    data: data,
  })

  return coupon
}

const retrieveAllCoupon = async () => {
  const result = await prisma.coupon.findMany({})

  return result
}

const retrieveCouponById = async (id: any) => {
  const result = await prisma.coupon.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  return result
}

const updateCouponById = async (id: string, payload: any) => {
  await prisma.coupon.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.coupon.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}

const deleteCouponById = async (id: string) => {
  await prisma.coupon.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.coupon.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const couponServices = {
  createCoupon,
  retrieveAllCoupon,
  retrieveCouponById,
  updateCouponById,
  deleteCouponById,
}
