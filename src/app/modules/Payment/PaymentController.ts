import { Request, Response } from 'express'
import CatchAsync from '../../utils/CatchAsync'
import { paymentServices } from './PaymentService'

const confirmationController = CatchAsync(
  async (req: Request, res: Response) => {
    const { transactionId } = req.query

    const result = await paymentServices.confirmationService(
      transactionId as string,
    )
    res.send(result)
  },
)

const PaymentFailed = CatchAsync(async (req, res) => {
  const result = await paymentServices.failedPayment()

  res.send(result)
})

export const paymentController = {
  confirmationController,
  PaymentFailed,
}
