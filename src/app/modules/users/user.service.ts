import { UserRole, UserStatus } from '@prisma/client'
import { TAdmin, TShop, TVendor } from './user.interface'
import prisma from '../../helpers/prisma'
import { HashPassword } from '../../helpers/HashPassword'
import { ImageUpload } from '../../utils/ImageUpload'
import { AppError } from '../../utils/AppError'
import httpStatus from 'http-status'

const createAdmin = async (payload: TAdmin) => {
  const password = await HashPassword(payload.password)
  const userData = {
    email: payload.email,
    password: password,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  }

  const adminData = {
    name: payload.name,
    email: payload.email,
    contactNumber: payload.contactNumber,
    isDeleted: false,
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    })

    const admin = await transactionClient.admin.create({
      data: adminData,
    })

    return admin
  })

  return result
}
const createVendor = async (files: any, payload: TVendor) => {
  const password = await HashPassword(payload.password)
  const userData = {
    email: payload.email,
    password: password,
    role: UserRole.VENDOR,
    status: UserStatus.ACTIVE,
  }

  const vendorData = {
    name: payload.name,
    email: payload.email,
    contactNumber: payload.contactNumber,
    isDeleted: false,
  }

  let shopLogo: string
  if (files?.logo) {
    const logoResponse: any = await ImageUpload(
      `${payload.shopName}-logo`,
      files.logo[0].path,
    )
    shopLogo = logoResponse.secure_url
  }

  let shopCover: string
  if (files?.cover) {
    const coverResponse: any = await ImageUpload(
      `${payload.shopName}-cover`,
      files.cover[0].path,
    )
    shopCover = coverResponse.secure_url
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    })

    const vendor = await transactionClient.vendor.create({
      data: vendorData,
    })

    const shopData = {
      shopName: payload.shopName,
      shopLogo: shopLogo,
      shopCover: shopCover,
      description: payload.description,
      vendorId: vendor.id,
      address: payload.address,
      registrationNumber: payload.registrationNumber,
      categoryId: payload.categoryId,
    }

    await transactionClient.shop.create({
      data: shopData,
    })

    return vendor
  })

  return result
}
const createCustomer = async (payload: TAdmin) => {
  const password = await HashPassword(payload.password)
  const userData = {
    email: payload.email,
    password: password,
    role: UserRole.CUSTOMER,
    status: UserStatus.ACTIVE,
  }

  const customerData = {
    name: payload.name,
    email: payload.email,
    contactNumber: payload.contactNumber,
    isDeleted: false,
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    })

    const customer = await transactionClient.customer.create({
      data: customerData,
    })

    return customer
  })

  return result
}

const retrieveAllUsers = async () => {
  const result = await prisma.user.findMany({
    include: {
      admin: true,
      customer: true,
      vendor: true,
    },
  })

  const data: any = result?.map(u => ({
    email: u.email,
    id: u.id,
    role: u.role,
    status: u.status,
    name: u.admin ? u.admin.name : u.vendor ? u.vendor?.name : u.customer?.name,
    profile: u.admin
      ? u.admin.profilePhoto
      : u.vendor
        ? u.vendor?.profilePhoto
        : u.customer?.profilePhoto,
    phone: u.admin
      ? u.admin.contactNumber
      : u.vendor
        ? u.vendor?.contactNumber
        : u.customer?.contactNumber,
  }))

  return data
}

const retrieveUserById = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      admin: true,
      customer: true,
      vendor: true,
    },
  })

  return result
}
const myProfile = async (user: any) => {
  const includeOptions: any = {}

  // Dynamically set include options based on the role
  if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
    includeOptions.admin = true
  } else if (user.role === 'CUSTOMER') {
    includeOptions.customer = true
  } else if (user.role === 'VENDOR') {
    includeOptions.vendor = true
  }

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include: includeOptions,
  })

  return result
}

const updateMyProfile = async (user: any, file: any, payload: any) => {
  console.log('Uploaded File:', file)
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    include: {
      admin: true,
      customer: true,
      vendor: true,
    },
  })

  if (file) {
    const response: any = await ImageUpload(file?.originalname, file.path)
    const secureUrl = response.secureUrl as string

    payload.profilePhoto = secureUrl || file?.path
  }

  if (isExistUser.role === 'ADMIN' || isExistUser.role === 'SUPER_ADMIN') {
    const result = await prisma.admin.update({
      where: {
        email: isExistUser.email,
      },
      data: {
        name: payload.name,
        contactNumber: payload.contactNumber,
        profilePhoto: payload.profilePhoto,
      },
    })
    return result
  } else if (isExistUser.role === 'VENDOR') {
    const result = await prisma.vendor.update({
      where: {
        email: isExistUser.email,
      },
      data: {
        name: payload.name,
        contactNumber: payload.contactNumber,
        profilePhoto: payload.profilePhoto,
      },
    })
    return result
  } else {
    const result = await prisma.customer.update({
      where: {
        email: isExistUser.email,
      },
      data: {
        name: payload.name,
        contactNumber: payload.contactNumber,
        profilePhoto: payload.profilePhoto,
      },
    })

    return result
  }
}

const userStatusChanged = async (
  id: string,
  status: 'ACTIVE' | 'SUSPEND' | 'BLOCKED' | 'DELETED',
) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  })

  const result = await prisma.$transaction(async transactionClient => {
    const userData = await transactionClient.user.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    })

    // is admin and status deleted
    if (
      (isExistUser.role === 'ADMIN' || isExistUser.role === 'SUPER_ADMIN') &&
      status === UserStatus.DELETED
    ) {
      await transactionClient.admin.update({
        where: {
          email: isExistUser.email,
        },
        data: {
          isDeleted: true,
        },
      })
    } else if (
      (isExistUser.role === 'ADMIN' || isExistUser.role === 'SUPER_ADMIN') &&
      status === UserStatus.ACTIVE
    ) {
      await transactionClient.vendor.update({
        where: {
          email: isExistUser.email,
        },
        data: {
          isDeleted: false,
        },
      })
    } else if (isExistUser.role === 'VENDOR' && status === UserStatus.DELETED) {
      await transactionClient.vendor.update({
        where: {
          email: isExistUser.email,
        },
        data: {
          isDeleted: true,
        },
      })
    } else if (isExistUser.role === 'VENDOR' && status === UserStatus.ACTIVE) {
      await transactionClient.vendor.update({
        where: {
          email: isExistUser.email,
        },
        data: {
          isDeleted: false,
        },
      })
    } else if (
      isExistUser.role === 'CUSTOMER' &&
      status === UserStatus.DELETED
    ) {
      await transactionClient.customer.update({
        where: {
          email: isExistUser.email,
        },
        data: {
          isDeleted: true,
        },
      })
    } else if (
      isExistUser.role === 'CUSTOMER' &&
      status === UserStatus.ACTIVE
    ) {
      await transactionClient.customer.update({
        where: {
          email: isExistUser.email,
        },
        data: {
          isDeleted: false,
        },
      })
    }

    return userData
  })

  return result
}

const userRoleUpdate = async (payload: { id: string; data: UserRole }) => {
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    include: { admin: true, customer: true, vendor: true },
  })

  if (!user) throw new Error('User not found')

  // Determine current role-specific model
  let currentRoleData: any
  if (user.role === 'ADMIN') {
    currentRoleData = await prisma.admin.findFirst({
      where: { email: user.email },
    })
  } else if (user.role === 'CUSTOMER') {
    currentRoleData = await prisma.customer.findFirst({
      where: { email: user.email },
    })
  } else if (user.role === 'VENDOR') {
    currentRoleData = await prisma.vendor.findFirst({
      where: { email: user.email },
    })
  }

  if (!currentRoleData) {
    throw new Error(`Role-specific data not found for role: ${user.role}`)
  }

  // Use a transaction for atomic updates
  await prisma.$transaction(async tx => {
    // Update user role
    await tx.user.update({
      where: { id: payload.id },
      data: { role: payload.data },
    })

    // Create new role-specific record
    if (payload.data === 'ADMIN') {
      await tx.admin.create({
        data: {
          id: user.id,
          name: currentRoleData.name,
          contactNumber: currentRoleData.contactNumber,
          email: user.email,
          isDeleted: currentRoleData.isDeleted,
          profilePhoto: currentRoleData.profilePhoto,
        },
      })
    } else if (payload.data === 'CUSTOMER') {
      await tx.customer.create({
        data: {
          id: user.id,
          name: currentRoleData.name,
          contactNumber: currentRoleData.contactNumber,
          email: user.email,
          isDeleted: currentRoleData.isDeleted,
          profilePhoto: currentRoleData.profilePhoto,
        },
      })
    } else if (payload.data === 'VENDOR') {
      await tx.vendor.create({
        data: {
          id: user.id,
          name: currentRoleData.name,
          contactNumber: currentRoleData.contactNumber,
          email: user.email,
          isDeleted: currentRoleData.isDeleted,
          profilePhoto: currentRoleData.profilePhoto,
        },
      })
    }

    // Delete old role-specific record
    if (user.role === 'ADMIN') {
      await tx.admin.delete({ where: { email: user.email } })
    } else if (user.role === 'CUSTOMER') {
      await tx.customer.delete({ where: { email: user.email } })
    } else if (user.role === 'VENDOR') {
      await tx.vendor.delete({ where: { email: user.email } })
    }
  })

  return { message: `User role updated to ${payload.data}` }
}

export const userServices = {
  createAdmin,
  createVendor,
  createCustomer,
  retrieveAllUsers,
  retrieveUserById,
  myProfile,
  userStatusChanged,
  updateMyProfile,
  userRoleUpdate,
}
