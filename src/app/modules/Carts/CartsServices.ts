import prisma from '../../helpers/prisma'
import { TCart } from './CartsInterface'

const createCart = async (user: any, payload: TCart) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  })
  payload.customerId = userData?.id
  const isExistProduct = await prisma.product.findUniqueOrThrow({
    where: {
      id: payload.productId,
    },
  })

  payload.vendorId = isExistProduct.vendorId
  const isAlreadyExist = await prisma.cart.findFirst({
    where: {
      customerId: userData?.id,
      productId: payload.productId,
    },
  })

  if (isAlreadyExist) {
    const result = await prisma.cart.update({
      where: {
        id: isAlreadyExist.id,
      },
      data: {
        color: payload.color,
        size: payload.size,
        price: payload.price,
        productId: payload.productId,
        qty: isAlreadyExist.qty + 1,
      },
    })
    return result
  } else {
    const result = await prisma.cart.create({
      data: payload,
    })

    return result
  }
}
const retrieveCart = async () => {
  const result = await prisma.cart.findMany({
    include: {
      product: true,
    },
  })

  return result
}
const retrieveMyCart = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: 'ACTIVE',
    },
  })
  const result = await prisma.cart.findMany({
    where: {
      customerId: userData?.id,
    },
    include: {
      product: true,
    },
  })

  return result
}
const retrieveCartById = async (id: string) => {
  const result = await prisma.cart.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      product: true,
    },
  })

  return result
}
const updateCart = async (id: string, payload: Partial<TCart>) => {
  await prisma.cart.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.cart.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}
const deleteCart = async (id: string) => {
  const result = await prisma.cart.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const cartsService = {
  createCart,
  retrieveCart,
  retrieveCartById,
  updateCart,
  deleteCart,
  retrieveMyCart,
}
