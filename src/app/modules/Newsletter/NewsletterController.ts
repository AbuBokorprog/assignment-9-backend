import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { newsletterServices } from './NewsletterServices'

const subscribeNewsletter = CatchAsync(async (req, res) => {
  const data = await newsletterServices.subscribeNewsletter(req.body)

  SuccessResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Subscribe successfully!',
    data,
  })
})

const retrieveAllSubscriber = CatchAsync(async (req, res) => {
  const data = await newsletterServices.retrieveAllSubscriber()

  SuccessResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Retrieve newsletters!',
    data,
  })
})

export const newsletterController = {
  subscribeNewsletter,
  retrieveAllSubscriber,
}
