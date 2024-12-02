import { z } from 'zod'

const createComparison = z.object({
  userId: z.string({ required_error: 'Customer ID is required.' }),
  productId: z.string({ required_error: 'Product ID is required.' }),
})

export const comparisonValidation = { createComparison }
