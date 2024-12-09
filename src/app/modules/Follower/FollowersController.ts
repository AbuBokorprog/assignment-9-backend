import httpStatus from 'http-status'
import SuccessResponse from '../../utils/SuccessResponse'
import CatchAsync from '../../utils/CatchAsync'
import { followerServices } from './FollowersServices'
import { Request, Response } from 'express'

const FollowShop = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await followerServices.FollowShop(req.user, req.body)

    SuccessResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Following successfully!',
      data,
    })
  },
)

const retrieveMyFollowingShop = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await followerServices.retrieveMyFollowingShop(req.user)

    SuccessResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Retrieve my following shop successfully!',
      data,
    })
  },
)

export const followerController = {
  FollowShop,
  retrieveMyFollowingShop,
}
