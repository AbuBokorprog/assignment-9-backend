import { z } from 'zod'

const createShop = z.object({
  shopName: z.string({ required_error: 'Enter unique shop name.' }),
  description: z.string().optional(),
  categoryId: z.string({ required_error: 'Enter valid category id.' }),
  address: z.string({ required_error: 'Enter valid address id.' }),
  registrationNumber: z.string({
    required_error: 'Enter valid registration number id.',
  }),
})

export const shopValidation = { createShop }
