import { z } from 'zod'

const CreateCategorySchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  description: z.string().optional(),
  image: z.string().url('Images must be a valid URL.').optional(),
})

export const categoryValidation = { CreateCategorySchema }
