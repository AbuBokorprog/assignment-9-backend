import prisma from '../../helpers/prisma'
import { TOrder } from './OrderInterface'

const createOrder = async (user: any, payload: TOrder) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  })

  payload.customerId = user.id

  const result = await prisma.$transaction(async transactionalClient => {
    const orderData = await transactionalClient.order.create({
      data: {
        customerId: payload.customerId,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        city: payload.city,
        deliveryAddress: payload.deliveryAddress,
        deliveryArea:
          payload.deliveryArea === '60' ? 'Inside Dhaka' : 'Outside Dhaka',
        postalCode: Number(payload.postalCode),
        quantity: Number(payload.quantity),
        totalAmount: payload.totalAmount,
        paymentType: payload.paymentType,
        deliveryCharge: Number(payload.deliveryArea),
      },
    })

    // Create product orders
    await Promise.all(
      payload.products.map(async product => {
        await transactionalClient.productOrder.create({
          data: {
            orderId: orderData.id,
            productId: product.productId,
            price: product.price,
            size: product.size || null, // Handle optional fields
            color: product.color || null, // Handle optional fields
            quantity: product.quantity,
          },
        })
      }),
    )

    await transactionalClient.payment.create({
      data: {
        orderId: orderData.id,
        amount: payload.totalAmount,
        paymentMethod: payload.paymentType,
        transactionId: `BB-${orderData.id}-${payload.totalAmount}`,
      },
    })

    await transactionalClient.cart.deleteMany({
      where: {
        customerId: payload.customerId,
      },
    })

    return orderData
  })

  return result
}
const retrieveOrder = async () => {
  const result = await prisma.order.findMany({
    include: {
      payment: true,
      customer: {
        include: {
          customer: true,
        },
      },
      products: {
        include: {
          product: true,
        },
      },
    },
  })

  return result
}

const retrieveMyOrders = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: 'ACTIVE',
    },
  })

  const result = await prisma.order.findMany({
    where: {
      customerId: userData.id,
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
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
const updateOrder = async (id: string, payload: any) => {
  await prisma.order.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.order.update({
    where: {
      id: id,
    },
    data: payload,
  })

  return result
}
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
  updateOrder,
  retrieveMyOrders,
  deleteOrder,
}
