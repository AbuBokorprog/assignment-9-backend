import { z } from 'zod'

const createOrder = z.object({
  customerId: z.string({ required_error: 'Customer id is required!' }),
  productId: z.string({ required_error: 'ProductId is required!' }),
  quantity: z.number({ required_error: 'Quantity is required!' }),
  totalAmount: z.number({ required_error: 'TotalAmount is required!' }),
})

export const orderValidation = { createOrder }
