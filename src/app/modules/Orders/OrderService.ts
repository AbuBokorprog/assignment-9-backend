import prisma from '../../helpers/prisma'
import { TOrder } from './OrderInterface'

const createOrder = async (payload: TOrder) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.customerId,
    },
  })

  const result = await prisma.$transaction(async transactionalClient => {
    const orderData = await transactionalClient.order.create({
      data: {
        customerId: payload.customerId,
        totalAmount: payload.totalAmount,
      },
    })

    await transactionalClient.productOrder.create({
      data: {
        orderId: orderData.id,
        productId: payload.productId,
        quantity: payload.quantity,
      },
    })
  })

  return result
}
const retrieveOrder = async () => {
  const result = await prisma.order.findMany({
    include: {
      products: true,
    },
  })

  return result
}
const retrieveOrderById = async (id: string) => {
  const result = await prisma.order.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      products: true,
    },
  })

  return result
}
// const updateOrder = async (id: string, payload: Partial<TOrder>) => {
//   await prisma.order.findUniqueOrThrow({
//     where: {
//       id: id,
//     },
//   })

//   const result = await prisma.order.update({
//     where: {
//       id: id,
//     },
//     data: payload,
//   })

//   return result
// }
const deleteOrder = async (id: string) => {
  const result = await prisma.order.delete({
    where: {
      id: id,
    },
  })

  return result
}

export const ordersService = {
  createOrder,
  retrieveOrder,
  retrieveOrderById,
  // updateOrder,
  deleteOrder,
}
