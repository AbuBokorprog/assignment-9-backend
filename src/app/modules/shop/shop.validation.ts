import { z } from 'zod'

const createShop = z.object({
  shopName: z.string({ required_error: 'Enter unique shop name.' }),
  shopLogo: z.string({ required_error: 'Enter shop logo.' }),
  shopCover: z.string({ required_error: 'Enter shop cover.' }),
  description: z.string().optional(),
  vendorId: z.string({ required_error: 'Enter valid vendor id.' }),
  categoryId: z.string({ required_error: 'Enter valid category id.' }),
  address: z.string({ required_error: 'Enter valid address id.' }),
  registrationNumber: z.string({
    required_error: 'Enter valid registration number id.',
  }),
})

export const shopValidation = { createShop }
