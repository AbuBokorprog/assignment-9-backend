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
  '/shop-unfollow',
  ValidationRequest(followerValidation.createFollower),
  followerController.unFollowShop,
)
// router.get('/', followerController.retrieveAllFollower)
// router.get('/:id', followerController.retrieveFollowerById)
// router.patch('/:id', followerController.updateFollowerById)
// router.delete('/:id', followerController.deleteFollowerById)

export const followerRouter = router
