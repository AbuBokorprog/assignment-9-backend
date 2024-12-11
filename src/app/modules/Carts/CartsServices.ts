import httpStatus from 'http-status'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'
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
    include: {
      vendor: true,
    },
  })

  payload.vendorId = isExistProduct.vendorId
  const isAlreadyExist = await prisma.cart.findFirst({
    where: {
      customerId: userData?.id,
      productId: payload.productId,
    },
  })

  const existingCart = await prisma.cart.findFirst({
    where: {
      customerId: userData.id,
    },
    include: {
      vendor: true,
    },
  })

  if (isExistProduct?.inventory === 0) {
    throw new AppError(400, 'The product is out of stock!')
  }

  const productInventory = isExistProduct.inventory - 1

  const result = await prisma.$transaction(async transactionClient => {
    if (isAlreadyExist) {
      const result = await transactionClient.cart.update({
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

      await transactionClient.product.update({
        where: {
          id: payload.productId,
        },
        data: {
          inventory: productInventory,
          stockStatus:
            productInventory > 10
              ? 'IN_STOCK'
              : productInventory <= 10
                ? 'LOW_STOCK'
                : 'OUT_OF_STOCK',
        },
      })
      return result
    } else if (
      existingCart &&
      existingCart.vendorId !== isExistProduct.vendorId
    ) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Your cart already contains items from vendor ${existingCart.vendor.name}. Would you like to replace the cart with products from vendor ${isExistProduct.vendor.name}?`,
      )
    } else {
      const result = await transactionClient.cart.create({
        data: payload,
      })

      await transactionClient.product.update({
        where: {
          id: payload.productId,
        },
        data: {
          inventory: productInventory,
          stockStatus:
            productInventory > 10
              ? 'IN_STOCK'
              : productInventory <= 10
                ? 'LOW_STOCK'
                : 'OUT_OF_STOCK',
        },
      })

      return result
    }
  })

  return result
}

const replaceCart = async (user: any, payload: TCart) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  })

  payload.customerId = user.id

  const isExistProduct = await prisma.product.findUniqueOrThrow({
    where: {
      id: payload.productId,
    },
  })

  payload.vendorId = isExistProduct.vendorId
  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.cart.deleteMany({
      where: { customerId: user.id },
    })

    const result = await transactionClient.cart.create({
      data: payload,
    })

    return result
  })

  return result
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
  const isExitCart = await prisma.cart.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: isExitCart.productId,
    },
  })

  const productInventory = product?.inventory + isExitCart.qty

  const result = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.cart.delete({
      where: {
        id: id,
      },
    })

    await transactionClient.product.update({
      where: {
        id: product?.id,
      },
      data: {
        inventory: productInventory,
      },
    })

    return result
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
  replaceCart,
}
