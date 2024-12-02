import { z } from 'zod'

const createFollower = z.object({
  customerId: z.string({ required_error: 'Customer ID is required.' }),
  shopId: z.string({ required_error: 'Product ID is required.' }),
})

export const followerValidation = { createFollower }
