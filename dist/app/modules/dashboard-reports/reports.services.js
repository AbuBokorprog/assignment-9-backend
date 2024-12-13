"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsService = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const getUserDashboardReports = (user) => __awaiter(void 0, void 0, void 0, function* () { });
const getVendorDashboardReports = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
    });
    const result = yield prisma_1.default.vendor.findFirst({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        include: {
            shops: {
                select: {
                    id: true,
                },
            },
            products: {
                select: {
                    id: true,
                },
            },
        },
    });
    return result;
});
const getAdminDashboardReports = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield prisma_1.default.user.count();
    const totalActiveShop = yield prisma_1.default.shop.count({
        where: {
            isActive: 'APPROVED',
        },
    });
    const totalOrders = yield prisma_1.default.order.count();
    return {
        totalUsers,
        totalActiveShop,
        totalOrders,
    };
});
exports.reportsService = {
    getUserDashboardReports,
    getVendorDashboardReports,
    getAdminDashboardReports,
};
