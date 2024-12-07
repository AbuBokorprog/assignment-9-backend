import { z } from 'zod'

const createWishlist = z.object({
  userId: z.string({ required_error: 'Customer ID is required.' }),
  productId: z.string({ required_error: 'Product ID is required.' }),
})

export const wishlistValidation = { createWishlist }
