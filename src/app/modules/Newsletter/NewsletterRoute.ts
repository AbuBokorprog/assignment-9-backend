import express from 'express'
import { newsletterController } from './NewsletterController'
import ValidationRequest from '../../utils/ValidationRequest'
import { newsletterValidation } from './NewsletterValidation'
const route = express.Router()

route.post(
  '/',
  ValidationRequest(newsletterValidation.subscribeNewsletter),
  newsletterController.subscribeNewsletter,
)
route.get('/', newsletterController.retrieveAllSubscriber)

export const newsletterRoute = route
