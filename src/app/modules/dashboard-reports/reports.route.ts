import express from 'express'
import { reportsController } from './reports.controller'
import Auth from '../../middlewares/Auth'
import { UserRole } from '@prisma/client'
const route = express.Router()

route.get(
  '/user/my-reports',
  Auth(UserRole.CUSTOMER),
  reportsController.getUserDashboardReports,
)
route.get(
  '/admin/my-reports',
  Auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  reportsController.getAdminDashboardReports,
)
route.get(
  '/vendor/my-reports',
  Auth(UserRole.VENDOR),
  reportsController.getVendorDashboardReports,
)

export const reportsRoute = route
