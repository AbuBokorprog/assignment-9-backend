import prisma from '../../helpers/prisma'

const getUserDashboardReports = async (user: any) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  })

  const totalOrder = await prisma.order.count({
    where: {
      customerId: isUserExist?.id,
    },
  })

  const totalWishlist = await prisma.wishlist.count({
    where: {
      userId: isUserExist?.id,
    },
  })

  const totalCart = await prisma.cart.count({
    where: {
      customerId: isUserExist?.id,
    },
  })

  const totalFollowingShop = await prisma.follower.count({
    where: {
      customerId: isUserExist?.id,
    },
  })

  const totalReview = await prisma.review.count({
    where: {
      customerId: isUserExist?.id,
    },
  })

  return {
    totalOrder,
    totalWishlist,
    totalCart,
    totalFollowingShop,
    totalReview,
  }
}

const getVendorDashboardReports = async (user: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  })

  const result = await prisma.vendor.findFirst({
    where: {
      email: user?.email,
    },
    include: {
      shops: {
        select: {
          id: true,
        },
      },
      products: {
        select: {
          id: true,
        },
      },
    },
  })

  return result
}

const getAdminDashboardReports = async (user: any) => {
  const totalUsers = await prisma.user.count()
  const totalActiveShop = await prisma.shop.count({
    where: {
      isActive: 'APPROVED',
    },
  })

  const totalOrders = await prisma.order.count()

  return {
    totalUsers,
    totalActiveShop,
    totalOrders,
  }
}

export const reportsService = {
  getUserDashboardReports,
  getVendorDashboardReports,
  getAdminDashboardReports,
}
