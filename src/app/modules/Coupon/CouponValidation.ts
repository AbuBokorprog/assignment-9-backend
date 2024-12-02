import { z } from 'zod'

const createCoupon = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  code: z
    .string({ required_error: 'Code is required.' })
    .regex(/^[A-Z0-9]+$/, 'Code must be alphanumeric and uppercase.'),
  discount: z.number().positive('Discount must be a positive number.'),
  expiryDate: z.string(),
})

export const couponValidation = { createCoupon }
