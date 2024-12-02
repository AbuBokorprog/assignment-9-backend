import { z } from 'zod'

const createCart = z.object({
  customerId: z.string({ required_error: 'Customer id is required!' }),
  productId: z.string({ required_error: 'Product id is required!' }),
})

export const cartValidation = { createCart }
