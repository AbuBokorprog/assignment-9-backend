import { z } from 'zod'

const CreateProductSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  regular_price: z.string().min(2, 'Price must be a positive string.'),
  discount_price: z
    .string()
    .min(2, 'Discount Price must be a positive string.'),
  description: z.string().optional(),
  categoryId: z.string({ required_error: 'Category ID is required.' }),
  shopId: z.string({ required_error: 'Shop ID is required.' }),
  inventory: z.string().min(1, 'Inventory must be a non-negative integer.'),
})

export const productValidation = { CreateProductSchema }
