"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsRoute = void 0;
const express_1 = __importDefault(require("express"));
const reports_controller_1 = require("./reports.controller");
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const client_1 = require("@prisma/client");
const route = express_1.default.Router();
route.get('/user/my-reports', (0, Auth_1.default)(client_1.UserRole.CUSTOMER), reports_controller_1.reportsController.getUserDashboardReports);
route.get('/admin/my-reports', (0, Auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), reports_controller_1.reportsController.getAdminDashboardReports);
route.get('/vendor/my-reports', (0, Auth_1.default)(client_1.UserRole.VENDOR), reports_controller_1.reportsController.getVendorDashboardReports);
exports.reportsRoute = route;
