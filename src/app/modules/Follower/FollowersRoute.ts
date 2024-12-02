import express from 'express'
import ValidationRequest from '../../utils/ValidationRequest'
import { followerValidation } from './FollowersValidation'
import { followerController } from './FollowersController'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(followerValidation.createFollower),
  followerController.createFollower,
)
router.get('/', followerController.retrieveAllFollower)
router.get('/:id', followerController.retrieveFollowerById)
router.patch('/:id', followerController.updateFollowerById)
router.delete('/:id', followerController.deleteFollowerById)

export const followerRouter = router
