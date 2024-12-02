import { z } from 'zod'

const CreateProductSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  price: z.number().positive('Price must be a positive number.'),
  description: z.string().optional(),
  categoryId: z.string({ required_error: 'Category ID is required.' }),
  vendorId: z.string({ required_error: 'Vendor ID is required.' }),
  shopId: z.string({ required_error: 'Shop ID is required.' }),
  images: z.string().url('Images must be a valid URL.').optional(),
  inventory: z
    .number()
    .int()
    .nonnegative('Inventory must be a non-negative integer.'),
  discount: z
    .number()
    .positive('Discount must be a positive number.')
    .optional(),
})

export const productValidation = { CreateProductSchema }
