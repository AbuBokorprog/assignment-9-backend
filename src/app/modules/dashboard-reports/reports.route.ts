import express from 'express'
import { reportsController } from './reports.controller'
const route = express.Router()

route.get('/user/my-reports', reportsController.getUserDashboardReports)
route.get('/admin/my-reports', reportsController.getAdminDashboardReports)
route.get('/vendor/my-reports', reportsController.getVendorDashboardReports)

export const reportsRoute = route
