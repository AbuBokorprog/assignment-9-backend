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
exports.couponServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        name: payload.name,
        code: payload.code,
        discount: Number(payload.discount),
        expiryDate: new Date(payload.expiryDate),
    };
    const coupon = yield prisma_1.default.coupon.create({
        data: data,
    });
    return coupon;
});
const applyCoupon = (user, couponCode, cartTotal) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the coupon
    const coupon = yield prisma_1.default.coupon.findUnique({
        where: { code: couponCode },
    });
    // Validate the coupon
    if (!coupon) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Invalid coupon code.');
    }
    if (!coupon.isActive) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'This coupon is not active.');
    }
    if (new Date(coupon.expiryDate) < new Date()) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'This coupon has expired.');
    }
    // Calculate the discounted total
    const discountAmount = (cartTotal * coupon.discount) / 100;
    const discountedTotal = Math.max(cartTotal - discountAmount, 0); // Ensure the total isn't negative
    return {
        originalTotal: cartTotal,
        discountAmount,
        discountedTotal,
        appliedCoupon: coupon.code,
    };
});
const retrieveAllCoupon = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.coupon.findMany({});
    return result;
});
const retrieveCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.coupon.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    return result;
});
const updateCouponById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCoupon = yield prisma_1.default.coupon.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.coupon.update({
        where: {
            id: id,
        },
        data: {
            name: payload.name,
            code: payload.code,
            discount: Number(payload.discount),
            expiryDate: (payload === null || payload === void 0 ? void 0 : payload.expiryDate)
                ? new Date(payload === null || payload === void 0 ? void 0 : payload.expiryDate)
                : new Date(isExistCoupon === null || isExistCoupon === void 0 ? void 0 : isExistCoupon.expiryDate),
        },
    });
    return result;
});
const deleteCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.coupon.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.coupon.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.couponServices = {
    createCoupon,
    retrieveAllCoupon,
    retrieveCouponById,
    updateCouponById,
    applyCoupon,
    deleteCouponById,
};
