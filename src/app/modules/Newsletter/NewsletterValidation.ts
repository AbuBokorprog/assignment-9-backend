import { z } from 'zod'

const subscribeNewsletter = z.object({
  email: z.string().email('Valid email is required!'),
})
export const newsletterValidation = { subscribeNewsletter }
