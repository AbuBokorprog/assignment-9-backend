import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
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

const applyCoupon = async (
  user: any,
  couponCode: string,
  cartTotal: number,
) => {
  // Find the coupon
  const coupon = await prisma.coupon.findUnique({
    where: { code: couponCode },
  })

  // Validate the coupon
  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid coupon code.')
  }

  if (!coupon.isActive) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This coupon is not active.')
  }

  if (new Date(coupon.expiryDate) < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This coupon has expired.')
  }

  // Calculate the discounted total
  const discountAmount = (cartTotal * coupon.discount) / 100
  const discountedTotal = Math.max(cartTotal - discountAmount, 0) // Ensure the total isn't negative

  return {
    originalTotal: cartTotal,
    discountAmount,
    discountedTotal,
    appliedCoupon: coupon.code,
  }
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
  applyCoupon,
  deleteCouponById,
}
