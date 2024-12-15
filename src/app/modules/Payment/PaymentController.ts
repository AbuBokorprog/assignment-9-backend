import { Request, Response } from 'express'
import CatchAsync from '../../utils/CatchAsync'
import { paymentServices } from './PaymentService'
import SuccessResponse from '../../utils/SuccessResponse'
import httpStatus from 'http-status'

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

const updateStatus = CatchAsync(async (req, res) => {
  const data = await paymentServices.updateStatus(req.body.id, req.body.status)

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Update payment status successfully!',
    data,
  })
})

export const paymentController = {
  confirmationController,
  PaymentFailed,
  updateStatus,
}
