import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { followerValidation } from './FollowersValidation'
import { followerController } from './FollowersController'

const router = express.Router()

router.post(
  '/shop-follow',
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
