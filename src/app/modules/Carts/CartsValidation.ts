import { z } from 'zod'

const createCart = z.object({
  productId: z.string({ required_error: 'Product id is required!' }),
})

export const cartValidation = { createCart }
