import { z } from 'zod'

const createWishlist = z.object({
  productId: z.string({ required_error: 'Product ID is required.' }),
})

export const wishlistValidation = { createWishlist }
