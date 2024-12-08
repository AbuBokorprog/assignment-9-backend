import { z } from 'zod'

const createRecentValidation = z.object({
  productId: z.string({ required_error: 'Product ID is required.' }),
})

export const recentProductsValidation = { createRecentValidation }
