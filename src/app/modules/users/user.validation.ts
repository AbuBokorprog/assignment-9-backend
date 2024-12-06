import { z } from 'zod'

const createAdmin = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string({ required_error: 'Enter password' }),
  profilePhoto: z.string().url().optional(),
  contactNumber: z.string().min(1, 'Contact number is required'),
})
const createVendor = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string({ required_error: 'Enter password' }),
  profilePhoto: z.string().url().optional(),
  contactNumber: z.string().min(1, 'Contact number is required'),
  shopName: z.string({ required_error: 'Enter unique shop name.' }),
  description: z.string().optional(),
  categoryId: z.string({ required_error: 'Enter valid category id.' }),
  address: z.string({ required_error: 'Enter valid address id.' }),
  registrationNumber: z.string({
    required_error: 'Enter valid registration number id.',
  }),
})

export const userValidation = { createAdmin, createVendor }
