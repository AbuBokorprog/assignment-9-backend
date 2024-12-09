import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { followerValidation } from './FollowersValidation'
import { followerController } from './FollowersController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/shop-follow',
  Auth(UserRole.CUSTOMER),
  ValidationRequest(followerValidation.createFollower),
  followerController.FollowShop,
)

router.post(
  '/my',
  Auth(UserRole.CUSTOMER),
  followerController.retrieveMyFollowingShop,
)

export const followerRouter = router
