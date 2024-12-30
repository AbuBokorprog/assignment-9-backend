import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { followerValidation } from './FollowersValidation'
import { followerController } from './FollowersController'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.post(
  '/shop-follow',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  ValidationRequest(followerValidation.createFollower),
  followerController.FollowShop,
)

router.get(
  '/my',
  Auth(
    UserRole.CUSTOMER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  followerController.retrieveMyFollowingShop,
)

export const followerRouter = router
