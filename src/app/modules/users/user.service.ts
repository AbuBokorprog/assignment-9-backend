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
const createVendor = async () => {}
const createCustomer = async () => {}

export const userServices = { createAdmin, createVendor, createCustomer }
