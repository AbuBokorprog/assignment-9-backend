import { z } from 'zod'

const createAdmin = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string({ required_error: 'Enter password' }),
  profilePhoto: z.string().url().optional(),
  contactNumber: z.string().min(1, 'Contact number is required'),
})

export const userValidation = { createAdmin }
