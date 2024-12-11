import { z } from 'zod'

const createReview = z.object({
  // customerId: z.string({ required_error: 'Customer ID is required.' }),
  productId: z.string({ required_error: 'Product ID is required.' }),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1.')
    .max(5, 'Rating cannot be more than 5.'),
  comment: z.string().optional(),
})

export const reviewValidation = { createReview }
