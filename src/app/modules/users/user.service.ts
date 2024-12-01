import { UserRole, UserStatus } from '@prisma/client'
import { TAdmin } from './user.interface'
import prisma from '../../helpers/prisma'
import { HashPassword } from '../../helpers/hash-password'

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
const createVendor = async (payload: TAdmin) => {
  const password = await HashPassword(payload.password)
  const userData = {
    email: payload.email,
    password: password,
    role: UserRole.VENDOR,
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

    const vendor = await transactionClient.vendor.create({
      data: adminData,
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

  return result
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

export const userServices = {
  createAdmin,
  createVendor,
  createCustomer,
  retrieveAllUsers,
  retrieveUserById,
}
