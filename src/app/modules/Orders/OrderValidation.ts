import { z } from 'zod'

const createOrder = z.object({
  quantity: z.number({ required_error: 'Quantity is required!' }),
  totalAmount: z.number({ required_error: 'TotalAmount is required!' }),
})

export const orderValidation = { createOrder }
