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
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        name: payload.name,
        code: payload.code,
        discount: payload.discount,
        expiryDate: new Date(payload.expiryDate),
    };
    const coupon = yield prisma_1.default.coupon.create({
        data: data,
    });
    return coupon;
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
    yield prisma_1.default.coupon.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.coupon.update({
        where: {
            id: id,
        },
        data: payload,
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
    deleteCouponById,
};
