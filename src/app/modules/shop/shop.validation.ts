import { z } from 'zod'

const createShop = z.object({
  shopName: z.string({ required_error: 'Enter unique shop name.' }),
  shopLogo: z.string({ required_error: 'Enter shop logo.' }),
  description: z.string().optional(),
  vendorId: z.string({ required_error: 'Enter valid vendor id.' }),
})

export const shopValidation = { createShop }
