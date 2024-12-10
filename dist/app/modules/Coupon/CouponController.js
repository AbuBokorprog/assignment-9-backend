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
exports.couponController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const CouponServices_1 = require("./CouponServices");
const createCoupon = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield CouponServices_1.couponServices.createCoupon(req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Create coupon successfully!',
        data,
    });
}));
const applyCoupon = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield CouponServices_1.couponServices.applyCoupon(req === null || req === void 0 ? void 0 : req.user, req.body.couponCode, req.body.cartTotal);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all coupons successfully!',
        data,
    });
}));
const retrieveAllCoupon = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield CouponServices_1.couponServices.retrieveAllCoupon();
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all coupons successfully!',
        data,
    });
}));
const retrieveCouponById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield CouponServices_1.couponServices.retrieveCouponById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve coupon by id successfully!',
        data,
    });
}));
const updateCouponById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield CouponServices_1.couponServices.updateCouponById(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update coupon by id successfully!',
        data,
    });
}));
const deleteCouponById = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield CouponServices_1.couponServices.deleteCouponById(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete coupon by id successfully!',
        data,
    });
}));
exports.couponController = {
    createCoupon,
    retrieveAllCoupon,
    retrieveCouponById,
    updateCouponById,
    deleteCouponById,
    applyCoupon,
};
