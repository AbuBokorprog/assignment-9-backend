import { z } from 'zod'

const createFollower = z.object({
  shopId: z.string({ required_error: 'Product ID is required.' }),
})

export const followerValidation = { createFollower }
