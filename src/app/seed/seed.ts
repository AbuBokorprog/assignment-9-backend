import { HashPassword } from '../helpers/HashPassword'
import prisma from '../helpers/prisma'

export const seedSuperAdmin = async () => {
  // Check if a SUPER_ADMIN already exists
  const isExistSuperAdmin = await prisma.user.findFirst({
    where: {
      email: 'superadmin@gmail.com',
    },
  })

  // If no SUPER_ADMIN exists, create one
  if (!isExistSuperAdmin) {
    const hashPassword = await HashPassword('super@admin')

    const result = await prisma.$transaction(async transactionClient => {
      // Create the user with SUPER_ADMIN role
      const userData = await transactionClient.user.create({
        data: {
          email: 'superadmin@gmail.com',
          password: hashPassword,
          role: 'SUPER_ADMIN',
          status: 'ACTIVE',
        },
      })

      // Create the admin record associated with the SUPER_ADMIN
      await transactionClient.admin.create({
        data: {
          name: 'Super Admin',
          email: userData.email,
          contactNumber: '01234567890',
          profilePhoto:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          isDeleted: false,
        },
      })

      return userData // Return the created user data for confirmation
    })

    return result
  }

  console.log('Super Admin already exists.')
}
