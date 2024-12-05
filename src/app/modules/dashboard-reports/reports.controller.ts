import httpStatus from 'http-status'
import CatchAsync from '../../utils/CatchAsync'
import SuccessResponse from '../../utils/SuccessResponse'
import { reportsService } from './reports.services'

const getUserDashboardReports = CatchAsync(async (req, res) => {
  const data = await reportsService.getUserDashboardReports()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Reports get successfully',
    data: data,
  })
})

const getVendorDashboardReports = CatchAsync(async (req, res) => {
  const data = await reportsService.getVendorDashboardReports()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Reports get successfully',
    data: data,
  })
})

const getAdminDashboardReports = CatchAsync(async (req, res) => {
  const data = await reportsService.getAdminDashboardReports()

  SuccessResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Reports get successfully',
    data: data,
  })
})

export const reportsController = {
  getUserDashboardReports,
  getVendorDashboardReports,
  getAdminDashboardReports,
}
