import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { reportsService } from './reports.services'
import { Request, Response } from 'express'

const getUserDashboardReports = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await reportsService.getUserDashboardReports(req?.user)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Reports get successfully',
      data: data,
    })
  },
)

const getVendorDashboardReports = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await reportsService.getVendorDashboardReports(req?.user)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Reports get successfully',
      data: data,
    })
  },
)

const getAdminDashboardReports = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const data = await reportsService.getAdminDashboardReports(req?.user)

    SuccessResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Reports get successfully',
      data: data,
    })
  },
)

export const reportsController = {
  getUserDashboardReports,
  getVendorDashboardReports,
  getAdminDashboardReports,
}
